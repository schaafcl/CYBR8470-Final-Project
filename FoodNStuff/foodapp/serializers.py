from rest_framework import serializers
from .models import Recipe, Ingredient

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        # model attributes go in fields in 'single quotes'
        fields = []


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = []