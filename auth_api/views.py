from django.conf import settings
import jwt
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from auth_api.models import User
from good.models import Good
from .serializers import LoginSerializer, RefreshTokenSerializer, SellerInfoSerializer, UserInfoSerializer, UserSerializer
from auth_api.authentication import JWTAuthentication
from django.db.models import Avg

class RegistrationAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            if 'email' in errors:
                return Response({'message':"Акаунт з таким email вже існує"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
    
class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        # Отримання даних про користувача з запиту
        user_data = request.data

        # Створення інстанції серіалізатора з отриманими даними
        serializer = self.serializer_class(data=user_data)

        # Валідація даних за допомогою серіалізатора
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Повернення відповіді з помилками валідації, якщо дані не валідні
            errors = serializer.errors
            if 'non_field_errors' in errors:
                return Response({'message':"Неправильний логін чи пароль"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
    
class RefreshTokenAPIView(APIView):
    serializer_class = RefreshTokenSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data.get('refresh_token')

        try:
            decoded = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded['id']
            user = User.objects.get(pk=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Refresh token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Перевірка, чи користувач активний
        if not user.is_active:
            return Response({'error': 'User account is not active'}, status=status.HTTP_401_UNAUTHORIZED)

        # Повернення нових токенів
        response_data = {
            'access_token': user.access_token,
            'refresh_token': user.refresh_token,
            'role': user.role,
        }
        return Response(response_data, status=status.HTTP_200_OK)

class SellerInfoAPIView(APIView):
    serializer_class = SellerInfoSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        seller = user.seller
        total_goods = Good.objects.filter(shop_id=seller.id).count()
        positive = Good.objects.filter(shop_id=seller.id, rating__gt=2.5).count()
        average_rating = Good.objects.filter(shop_id=seller.id).aggregate(avg_rating=Avg('rating'))['avg_rating']


        seller_data = {
            'id': seller.id,
            'name': seller.name,
            'phone': seller.phone,
            'adress': seller.adress,
            'date_registered': seller.date_registered,
            'avatar': user.avatar.avatar.url if hasattr(user, 'avatar') and user.avatar else None,
            'percent': positive/total_goods * 100 if total_goods > 0 else 0,
            'rating': average_rating if average_rating else 0,
        }
        serializer = self.serializer_class(data=seller_data)
        if(serializer.is_valid()):
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        if hasattr(user, 'seller'):
            name=user.seller.name
        else:
            name=user.buyer.first_name + ' ' + user.buyer.last_name
        data = {
            'avatar': user.avatar.avatar.url if user.avatar else None,
            'name': name,
            'email': user.email
        }
        return Response(data, status=status.HTTP_200_OK)
