from django.shortcuts import render
#from rest_framework import status
#from rest_framework.response import Response
#from rest_framework.decorators import api_view
from .models import Ingredient, Recipe
from .serializers import IngredientSerializer, RecipeSerializer
from rest_framework import status, permissions, renderers, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
#from rest_framework.decorators import api_view, permission_classes, renderer_classes
#from django.contrib.auth import authenticate
#from spyne import Application, rpc, ServiceBase, Integer, Unicode
from django.views.decorators.csrf import csrf_exempt
#from .permissions import IsOwner
#from rest_framework import generics

# Create your views here.

# imported from previous labs and commented out things not needed, will clean up later    

# 12-7 adding search_fields to allow searching by recipe name
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter]
    # enables the attribute recipe name to be searchable via user input
    search_fields = ['name']

    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        #handles posts to create a new recipe
        return super().create(request, *args, **kwargs)
    
    # used to search for recipe by its name, case insensitive
    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(name__icontains=search_term)  # Case-insensitive search on title
            # test print
            print(queryset)
        return queryset
    
    # used to update recipe values, can change to put if need be
    @action(detail=True, methods=['patch'])
    def update_recipe(self, request, pk=None):
        recipe = self.get_object()
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)