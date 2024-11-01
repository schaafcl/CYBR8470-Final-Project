from django.db import models

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
    ingredients = models.ManyToManyField(Ingredient)
    def __str__(self):
        return self.name
