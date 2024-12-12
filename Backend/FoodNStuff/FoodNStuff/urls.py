from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from foodapp.views import IngredientViewSet, RecipeViewSet

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
