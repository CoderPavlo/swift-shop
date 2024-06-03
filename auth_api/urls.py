from django.urls import path

from .views import LoginAPIView, RefreshTokenAPIView, RegistrationAPIView, SellerInfoAPIView, UserInfoAPIView

app_name = 'auth_api'
urlpatterns = [
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view()),
    path('refresh/', RefreshTokenAPIView.as_view()),
    path('seller/', SellerInfoAPIView.as_view()),
    path('userInfo/', UserInfoAPIView.as_view()),

]