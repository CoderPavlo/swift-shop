from django.conf import settings
import jwt
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from auth_api.models import User
from .serializers import LoginSerializer, RefreshTokenSerializer, UserSerializer

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
            'refresh_token': user.refresh_token
        }
        return Response(response_data, status=status.HTTP_200_OK)