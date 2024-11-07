from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Ingredient Model
class Ingredient(models.Model):
    # attributes here
    name = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name
    

# Recipe Model
class Recipe(models.Model):
    # attributes of the model go here
    name = models.CharField(max_length=100)
    description = models.TextField()
    servings = models.PositiveIntegerField()
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