from rest_framework import serializers
from .models import Recipe, Ingredient
from rest_framework.reverse import reverse



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        # removed field for "recipe" as a test 12-5-24
        fields = ['id', 'name', 'description', 'quantity', 'measurement_unit', 'recipe']


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Recipe
        # model attributes go in fields in 'single quotes'
        fields = ['id', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'protein', 'category', 'instructions', 'image', 'ingredients']

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)

        # Create or get ingredients
        for ingredient_data in ingredients_data:
            # Check if the ingredient exists, if not create it
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient_data['name'], description=ingredient_data.get('description', ''), 
                                                                   quantity=ingredient_data['quantity'], measurement_unit=ingredient_data['measurement_unit'],
                                                                   recipe=recipe)
            recipe.ingredients.add(ingredient)

        return recipe
    
    # overrides default update with custom for nested attributes
    def update(self, recipe, validated_data):
        # for the basic fields
        recipe.name = validated_data.get('name', recipe.name)
        recipe.description = validated_data.get('description', recipe.description)
        recipe.prep_time = validated_data.get('prep_time', recipe.prep_time)
        recipe.cook_time = validated_data.get('cook_time', recipe.cook_time)
        recipe.protein = validated_data.get('protein', recipe.protein)
        recipe.category = validated_data.get('category', recipe.category)
        recipe.instructions = validated_data.get('instructions', recipe.instructions)
        # for ingredients
        ingredients_data = validated_data.get('ingredients', [])
        existing_ingredients = recipe.ingredients.all()
        # Handle ingredients update - remove, add, or update
        for ingredient_data in ingredients_data:
            ingredient_id = ingredient_data.get('id')
            if ingredient_id:
                # Check if the ingredient already exists
                ingredient = existing_ingredients.filter(id=ingredient_id).first()
                if ingredient:
                    # Update the existing ingredient
                    ingredient.name = ingredient_data.get('name', ingredient.name)
                    ingredient.description = ingredient_data.get('description', ingredient.description)
                    ingredient.quantity = ingredient_data.get('quantity', ingredient.quantity)
                    ingredient.measurement_unit = ingredient_data.get('measurement_unit', ingredient.measurement_unit)
                    ingredient.save()
                else:
                    # Add new ingredient if not found
                    ingredient = Ingredient.objects.create(**ingredient_data)
                    recipe.ingredients.add(ingredient)
            else:
                # If no id, it's a new ingredient to be added
                ingredient = Ingredient.objects.create(**ingredient_data)
                recipe.ingredients.add(ingredient)

        # Remove any ingredients that are not in the update request
        updated_ingredient_ids = [ingredient_data.get('id') for ingredient_data in ingredients_data if ingredient_data.get('id') is not None]
        for existing_ingredient in existing_ingredients:
            if existing_ingredient.id not in updated_ingredient_ids:
                recipe.ingredients.remove(existing_ingredient)

        # Save the updated recipe
        recipe.save()
        return recipe


# NOTE:  may need to add serializers for protein and category if I keep those as models