from django.contrib import admin
from .models import Recipe

# administrator model
class Admin(admin.ModelAdmin):
    list_display = ('name', 'recipe_owner')
    search_fields = ('name', 'protein', 'category')
    list_filter = ('name', 'protein', 'category', 'recipe_owner')
    list_display_links = ('name',)
    fields = ('recipe_owner', 'name', 'protein', 'category')

admin.site.register(Recipe, Admin)