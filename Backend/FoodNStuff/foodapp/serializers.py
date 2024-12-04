from rest_framework import serializers
from .models import Recipe, Ingredient



class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'description', 'quantity', 'measurement_unit', 'recipe']


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Recipe
        # model attributes go in fields in 'single quotes'
        fields = ['id', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'protein', 'category', 'image', 'ingredients']


# NOTE:  may need to add serializers for protein and category if I keep those as models