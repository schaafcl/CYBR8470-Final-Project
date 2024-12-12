from django.db import models
from django.contrib.auth.models import User

# Recipe Model
class Recipe(models.Model):
    # attributes of the model go here
    # ingredients started as its own model but I ran into forein key issues and due to time was forced to make it a simple text field
    ingredients = models.TextField()
    name = models.CharField(max_length=100)
    description = models.TextField(null=True)
    servings = models.PositiveIntegerField(null=True)
    # prep time in minutes, allow nulls if you don't want to enter this
    prep_time = models.PositiveIntegerField(null=True)
    # cook time in minutes, allow nulls
    cook_time = models.PositiveIntegerField(null=True)
    # protein and category will be character fields, but their input will be curated on the front end to specific options
    protein = models.CharField(max_length=100, default="None")
    category = models.CharField(max_length=100, default="None")
    # NOTE:  add html escaping and input sanitization to textfields
    instructions = models.TextField(null=True)

    def __str__(self):
        return self.name