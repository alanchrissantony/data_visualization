from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model

# Custom User model extending AbstractUser
class User(AbstractUser):
    is_admin = models.BooleanField(default=False)  # Field to indicate if the user is an admin

    def __str__(self):
        return self.username

# UserProfile model linked to the User model
class UserProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.user.username} Profile'