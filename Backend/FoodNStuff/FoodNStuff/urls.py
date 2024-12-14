from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from foodapp.views import RecipeViewSet, LoginViewSet, LogoutViewSet, RegisterViewSet, csrf_token_view
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
from django.views.decorators.csrf import csrf_exempt


router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'logout', LogoutViewSet, basename='logout')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    #path('', include('foodapp.urls')),
    path('api/login/', auth_views.LoginView.as_view(), name='login'),
    path('api/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/csrf/', csrf_token_view),
]
