from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Ingredient Model
class Ingredient(models.Model):
    # attributes here
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    quantity = models.DecimalField(max_digits=8, decimal_places=2, null=True, default="0")
    measurement_unit = models.CharField(max_length=50, default="None")
    # CASCADE --> deletes references to an instance when it is removed
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE, related_name='ingredient_list', null=True)
    

    def __str__(self):
        return self.name
    

# Recipe Model
class Recipe(models.Model):
    # attributes of the model go here
    ingredients = models.ManyToManyField(Ingredient, blank=True, related_name='recipes')
    name = models.CharField(max_length=100)
    description = models.TextField(null=True)
    servings = models.PositiveIntegerField(null=True)
    # prep time in minutes, allow nulls if you don't want to enter this
    prep_time = models.PositiveIntegerField(null=True)
    # cook time in minutes, allow nulls
    cook_time = models.PositiveIntegerField(null=True)
    # might not need this??? ingredients that are a part of a recipe will have this recipe as their foreign key
    #ingredients = models.ManyToManyField(Ingredient)
    # NOTE:  this is for the curated list of proteins need to make this yet, for now make it a string
    #protein = models.ForeignKey('Protein', on_delete=models.SET_NULL, null=True)
    #category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    protein = models.CharField(max_length=100, default="None")
    category = models.CharField(max_length=100, default="None")
    # NOTE:  add html escaping and input sanitization to textfields
    instructions = models.TextField(null=True)
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

# NOTE:  maybe add a favorites model that allows a logged in user to browse the entire db of recipes and add select ones to their favorites list for quicker browsing through their favorite recipes

# NOTE:  might not want to have protein and category as their own models, instead have them be a pre-made list of options.  I want to prevent users from adding protein types or categories all "willy-nilly"