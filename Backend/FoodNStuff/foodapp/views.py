from django_filters.rest_framework import DjangoFilterBackend
from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import status, viewsets, filters, permissions
from rest_framework.response import Response
from .permissions import IsOwnerOrStaff
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken


# Viewset for recipes
class RecipeViewSet(viewsets.ModelViewSet):

    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # enable filtering and searching on the home page based on querying 'name' 'protein' and 'category' fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "protein", "category"]
    search_fields = ["name", "protein", "category"]
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]


    def retrieve(self, request, *args, **kwargs):

        recipe = self.get_object()
        serializer = self.get_serializer(recipe)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(recipe_owner=self.request.user)

    # custom search results, used to filter which recipes show up when searching based on whether the current user has permission to view them or not, staff members can view/edit all recipes
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Recipe.objects
        else:
            return Recipe.objects.filter(recipe_owner = user)
        
'''
@csrf_exempt  # Disable CSRF for this view
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data['refresh']
        # Invalidate the refresh token (blacklist)
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
'''