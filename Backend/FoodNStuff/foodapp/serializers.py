from rest_framework import serializers
from .models import Recipe, Ingredient



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        # removed field for "recipe" as a test 12-5-24
        fields = ['id', 'name', 'description', 'quantity', 'measurement_unit', 'recipe']


class RecipeSerializer(serializers.ModelSerializer):
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


# NOTE:  may need to add serializers for protein and category if I keep those as models