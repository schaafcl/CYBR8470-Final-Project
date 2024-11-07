from django.shortcuts import render
#from rest_framework import status
#from rest_framework.response import Response
#from rest_framework.decorators import api_view
from .models import Ingredient, Recipe
from .serializers import IngredientSerializer, RecipeSerializer
from rest_framework import status, permissions, renderers, viewsets
#from rest_framework.decorators import api_view, permission_classes, renderer_classes
#from django.contrib.auth import authenticate
#from spyne import Application, rpc, ServiceBase, Integer, Unicode
from django.views.decorators.csrf import csrf_exempt
#from .permissions import IsOwner
#from rest_framework import generics

# Create your views here.

# imported from previous labs and commented out things not needed, will clearn up later
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer