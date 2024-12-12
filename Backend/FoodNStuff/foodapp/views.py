import django_filters
from django.shortcuts import render
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import status, permissions, renderers, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter
# from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# imported from previous labs and commented out things not needed, will clean up later 

class RecipeFilter(django_filters.FilterSet):
    protein = django_filters.CharFilter(lookup_expr='icontains')
    category = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Recipe
        fields = ['name', 'protein', 'category']  

# 12-7 adding search_fields to allow searching by recipe name
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, OrderingFilter)
    filterset_class = RecipeFilter
    # enables the attribute recipe name to be searchable via user input
    search_fields = ['name', 'protein', 'category']


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
            queryset = queryset.filter(name__icontains=search_term) 
            queryset = queryset.filter(category__icontains=search_term)
            # test print
            #print(queryset)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def filter_recipes(self, request):

        name = request.query_params.get('name', None)
        protein = request.query_params.get('protein', None)
        category = request.query_params.get('category', None)

        # Apply filters based on query parameters
        if name:
            self.queryset = self.queryset.filter(name__icontains=name)
        if protein:
            self.queryset = self.queryset.filter(protein__icontains=protein)
        if category:
            self.queryset = self.queryset.filter(category__icontains=category)
        

        # Serialize the filtered queryset
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
    
    # used to update recipe values, can change to put if need be
    @action(detail=True, methods=['patch'])
    def update_recipe(self, request, pk=None):
        recipe = self.get_object()
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)