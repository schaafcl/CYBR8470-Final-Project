from django.db import models

# Create your models here.


# Recipe Model
class Recipe(models.Model):
    # attributes of the model go here

    def __str__(self):
        return self.name



# Ingredient Model
class Ingredient(models.Model):
    # attributes here

    def __str__(self):
        return self.name
