from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get('X-API-KEY')
        
        if api_key != 'expected_api_key':
            raise AuthenticationFailed('Invalid API Key')
        
        # If the API key is correct, return a dummy user (you can retrieve real users if needed)
        return (None, None)  # You can pass user data if necessary
