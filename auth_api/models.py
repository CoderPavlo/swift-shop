import jwt

from datetime import datetime, timedelta
from django.utils import timezone

from django.conf import settings 
from django.contrib.auth.models import (
	AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role='buyer'):
        user = self.model(
            email=self.normalize_email(email),
            role=role,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
            role='admin',
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    ROLE_CHOICES = (
        ('admin', 'Administrator'),
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
    
    def get_role(self):
        return self.role

    @property
    def access_token(self):
        """Генерує access токен."""
        return self._generate_jwt_token(token_type='access')
    
    @property
    def refresh_token(self):
        """Генерує refresh токен."""
        return self._generate_jwt_token(token_type='refresh')
    
    def _generate_jwt_token(self, token_type='access'):
        """
        Генерує JWT токен.

        Args:
            token_type (str): Тип токена ('access' або 'refresh').

        Returns:
            str: JWT токен.
        """
        dt = datetime.now() + timedelta(minutes=15) if token_type == 'access' else datetime.now() + timedelta(days=1)
        payload = {
            'id': self.pk,
            'exp': int(dt.timestamp())
        }
        if token_type == 'refresh':
            payload['type'] = 'refresh'
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

def upload_to(instance, filename):
    return 'avatars/{filename}'.format(filename=filename)

    
class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='buyer')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    day = models.IntegerField()  # день
    month = models.IntegerField()  # місяць
    year = models.IntegerField()  # рік
    GENDER_CHOICES = [
        (0, 'Unknown'),
        (1, 'Male'),
        (2, 'Female'),
    ]
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0)  # стать
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    adress = models.CharField(max_length=255)
    date_registered = models.DateField(default=timezone.now)
    
    def __str__(self):
        return self.name
    
class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='avatar')
    avatar = models.ImageField(upload_to=upload_to, null=True, blank=True)

    def __str__(self):
        return self.user.email