import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Creates a superuser if it does not already exist'

    def handle(self, *args, **kwargs):
        # Get environment variables for superuser details
        username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
        email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
        password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'adminpassword')

        # Check if the superuser already exists
        if not User.objects.filter(username=username).exists():
            # Create a new superuser if not already created
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f'Superuser {username} created successfully'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Superuser {username} already exists'))