from django_filters.rest_framework import DjangoFilterBackend
from .models import Recipe
from .serializers import RecipeSerializer, UserRegistrationSerializer, LoginSerializer
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.middleware.csrf import get_token


# Viewset for recipes
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # enable filtering and searching on the home page based on querying 'name' 'protein' and 'category' fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "protein", "category"]
    search_fields = ["name", "protein", "category"]
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]


# viewset for registering users
class RegisterViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny]  # Anyone can access the registration endpoint
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# viewset for logins
class LoginViewSet(GenericViewSet):
    permission_classes = [AllowAny]  # Anyone can access the login endpoint

    
    
    def create(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user is not None:
                login(request, user)
                return Response({"message": "Login successful"})
            else:
                return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    '''
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    '''

# logouts
class LogoutViewSet(GenericViewSet):
    def create(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logout successful"})
    
def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})
