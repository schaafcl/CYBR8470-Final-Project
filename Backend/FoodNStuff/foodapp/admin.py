from django.contrib import admin
from .models import Recipe

# administrator model allows creation and manipulation of recipes and users from the django admin dashboard
class Admin(admin.ModelAdmin):
    list_display = ('name', 'recipe_owner')
    search_fields = ('name', 'protein', 'category')
    list_filter = ('name', 'protein', 'category', 'recipe_owner')
    list_display_links = ('name',)
    fields = ('recipe_owner', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'protein', 'category', 'instructions', 'ingredients')

admin.site.register(Recipe, Admin)