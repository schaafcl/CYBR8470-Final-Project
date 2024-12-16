from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from foodapp.views import RecipeViewSet
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'logout', LogoutViewSet, basename='logout')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/recipes/<int:id>/<int:pk>/', RecipeViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}))
]
