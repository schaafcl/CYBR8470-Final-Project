from django.db import models
from django.contrib.auth.models import User
import bleach

# Recipe Model
class Recipe(models.Model):
    # attributes of the model go here
    # ingredients started as its own model but I ran into forein key issues and due to time was forced to make it a simple text field
    
    name = models.CharField(max_length=300)
    description = models.TextField(default="N/A")
    servings = models.PositiveIntegerField(default=1)
    # prep time in minutes, allow nulls if you don't want to enter this
    prep_time = models.PositiveIntegerField(default=0)
    # cook time in minutes, allow nulls
    cook_time = models.PositiveIntegerField(default=0)
    # protein and category will be character fields, but their input will be curated on the front end to specific options
    protein = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    # NOTE:  add html escaping and input sanitization to textfields
    instructions = models.TextField(default="N/A")
    ingredients = models.TextField(max_length=5000)

    def clean(self):
        # Define the allowed tags and attributes, app isn't designed to accept user input that includes html tags but just in case I'm adding it
        allowed_tags = ['b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a', 'img', 'h1', 'h2', 'h3', 'blockquote', 'span']
        allowed_attributes = {
            'a': ['href', 'title'],  # Only allow 'href' and 'title' for links
            'img': ['src', 'alt', 'title'],  # Only allow 'src', 'alt', 'title' for images
        }
        
        # Clean the content by allowing only the safe tags and attributes
        self.name = bleach.clean(self.description, tags=allowed_tags, attributes=allowed_attributes)
        self.description = bleach.clean(self.description, tags=allowed_tags, attributes=allowed_attributes)
        self.ingredients = bleach.clean(self.ingredients, tags=allowed_tags, attributes=allowed_attributes)
        self.instructions = bleach.clean(self.instructions, tags=allowed_tags, attributes=allowed_attributes)
        self.protein = bleach.clean(self.instructions, tags=allowed_tags, attributes=allowed_attributes)
        self.category = bleach.clean(self.instructions, tags=allowed_tags, attributes=allowed_attributes)
    
    def save(self, *args, **kwargs):
        self.clean()  # Ensure content is sanitized before saving
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name