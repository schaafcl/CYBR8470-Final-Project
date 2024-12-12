from rest_framework import serializers
from .models import Recipe, Ingredient
from rest_framework.reverse import reverse


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        # model attributes go in fields in 'single quotes'
        fields = ['id', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'protein', 'category', 'instructions', 'ingredients']
