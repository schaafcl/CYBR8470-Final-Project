from django.db import models
from django.contrib.auth.models import User

# Recipe Model
class Recipe(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, default="N/A")
    servings = models.PositiveIntegerField(default=1)
    # prep time in minutes
    prep_time = models.PositiveIntegerField(default=0)
    # cook time in minutes
    cook_time = models.PositiveIntegerField(default=0)
    # protein and category are charfields, but the inputs are restricted to curated lists on the frontend
    protein = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    instructions = models.TextField(max_length=5000, default="N/A")
    ingredients = models.TextField(max_length=5000, default="")

    def recipe_owner(self):
        return self.user.username
    
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name