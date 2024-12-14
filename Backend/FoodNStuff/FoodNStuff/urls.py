from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from foodapp.views import RecipeViewSet
from django.contrib.auth import views as auth_views

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
