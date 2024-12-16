from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Recipe
from rest_framework import serializers


# serializer to use with the viewsets and automatic routing
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'protein', 'category', 'instructions', 'ingredients', 'recipe_owner']
        read_only_fields = ['recipe_owner']

    # retrieve the logged in user from context and set the recipe owner to that user upon creation
    def create(self, validated_data):
        owner = self.context['request'].user
        validated_data['recipe_owner'] = owner
        return Recipe.objects.create(**validated_data)
    