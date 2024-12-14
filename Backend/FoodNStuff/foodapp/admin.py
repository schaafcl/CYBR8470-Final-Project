from django.contrib import admin
from .models import Recipe

# Aministrator model for owner of recipes
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'recipe_owner')
    search_fields = ('name', 'protein', 'category')
    list_filter = ('name',)
    list_display_links = ('name',)
    fields = ('recipe_owner', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'protein', 'category', 'instructions', 'ingredients')

admin.site.register(Recipe, RecipeAdmin)
