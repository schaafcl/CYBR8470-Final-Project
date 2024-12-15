from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import status, permissions, renderers, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import IsOwner
# from django.views.decorators.csrf import csrf_exempt


# Viewset for recipes
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # enable filtering and searching on the home page based on querying 'name' 'protein' and 'category' fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "protein", "category"]
    search_fields = ["name", "protein", "category"]
    permission_classes = [permissions.IsAuthenticated, IsOwner]


    def retrieve(self, request, *args, **kwargs):

        recipe = self.get_object()
        if recipe.recipe_owner != request.user:
            return Response({'error': 'You do not have permission to view this dog.'}, status=403)

        serializer = self.get_serializer(recipe)
        return Response(serializer.data)
    

    def perform_create(self, serializer):
        serializer.save(recipe_owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(recipe_owner = user)
    