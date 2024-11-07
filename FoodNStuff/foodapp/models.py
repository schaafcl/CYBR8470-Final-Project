from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Ingredient Model
class Ingredient(models.Model):
    # attributes here
    name = models.CharField(max_length=100)
    description = models.TextField(null=True)
    quantity = models.DecimalField(max_digits=8, decimal_places=2)
    measurement_unit = models.CharField(max_length=50)
    # CASCADE --> deletes references to an instance when it is removed
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE, related_name='ingredients')
    

    def __str__(self):
        return self.name
    

# Recipe Model
class Recipe(models.Model):
    # attributes of the model go here
    name = models.CharField(max_length=100)
    description = models.TextField()
    servings = models.PositiveIntegerField()
    # prep time in minutes, allow nulls if you don't want to enter this
    prep_time = models.PositiveIntegerField(null=True)
    # cook time in minutes, allow nulls
    cook_time = models.PositiveIntegerField(null=True)
    ingredients = models.ManyToManyField(Ingredient)
    protein = models.ForeignKey('Protein', on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)

    def __str__(self):
        return self.name

# Model for Protein type (e.g. Poultry, Beef, Pork, Seafood, Vegetable, etc)   
class Protein(models.Model):
    # attributes
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Model for meal type (e.g. Breakfast, Lunch, Dinner, Soup, Salad, Sandwich, etc)
class Category(models.Model):
    # attributes
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
# NOTE:  maybe add a model for Nutritional information that can be populated by calling the EDAMAM API and then stored