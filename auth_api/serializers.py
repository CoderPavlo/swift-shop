from django.forms import ValidationError
from rest_framework import serializers
from .models import Avatar, Buyer, Seller, User
from django.contrib.auth import authenticate

class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = ['first_name', 'last_name', 'day', 'month', 'year', 'gender']
    

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['name', 'phone', 'adress']

class UserSerializer(serializers.ModelSerializer):
    buyer = BuyerSerializer(write_only=True, required=False)
    seller = SellerSerializer(write_only=True, required=False)
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    email = serializers.CharField(write_only=True)
    role = serializers.CharField(max_length=20, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    avatar = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'role', 'access_token', 'refresh_token', 'buyer', 'seller', 'avatar']

    def create(self, validated_data):
        role = validated_data.pop('role', None)
        buyer_data = validated_data.pop('buyer', None)
        seller_data = validated_data.pop('seller', None)
        avatar = validated_data.pop('avatar', None)

        user = User.objects.create_user(**validated_data, role=role)

        if role == 'buyer' and buyer_data:
            Buyer.objects.create(user=user, **buyer_data)
        elif role == 'seller' and seller_data:
            Seller.objects.create(user=user, **seller_data)

        if avatar:
            Avatar.objects.create(user=user, avatar=avatar)

        return user

    def save(self, **kwargs):
        kwargs.pop('user', None)
        return super().save(**kwargs)
    
    def validate_email(self, value):
        """
        Перевіряє, чи не існує вже користувача з такою ж електронною адресою.
        """
        if User.objects.filter(email=value).exists():
            raise ValidationError("")
        return value

    
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    role = serializers.CharField(max_length=20, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(username=email, password=password)

        if user is None:
            raise ValidationError('')
        
        return {
            'email': user.email,
            'role': user.role,
            'access_token': user.access_token,
            'refresh_token': user.refresh_token
        }
    
    
class RefreshTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(max_length=255)

    def validate_refresh_token(self, value):
        if not value:
            raise serializers.ValidationError("No refresh token provided")
        return value
    
class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ['avatar']

class SellerInfoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=255)
    adress = serializers.CharField(max_length=255)
    date_registered = serializers.DateField()
    avatar = serializers.CharField(max_length=255, required=False, allow_null=True)
    percent = serializers.FloatField()
    rating = serializers.FloatField()

class SellerIdSerializer(serializers.Serializer):
    avatar = serializers.CharField(max_length=255, source='user.avatar.avatar.url')
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    class Meta:
        model = Seller
        fields = ['id', 'name', 'avatar']
