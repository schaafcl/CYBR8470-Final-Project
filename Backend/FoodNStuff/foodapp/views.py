from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import status, permissions, renderers, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
# from django.views.decorators.csrf import csrf_exempt


# Viewset for recipes
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # enable filtering and searching on the home page based on querying 'name' 'protein' and 'category' fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "protein", "category"]
    search_fields = ["name", "protein", "category"]


    '''
    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        #handles posts to create a new recipe
        return super().create(request, *args, **kwargs)
    '''
    '''
    # used to search for recipe by its name, case insensitive
    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(name__icontains=search_term)  # Case-insensitive search on title
            # test print
            print(queryset)
        return queryset
    '''
    '''
    # used to update recipe values, can change to put if need be
    @action(detail=True, methods=['patch'])
    def update_recipe(self, request, pk=None):
        recipe = self.get_object()
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    '''