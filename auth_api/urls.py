from django.urls import path

from .views import LoginAPIView, RefreshTokenAPIView, RegistrationAPIView

app_name = 'auth_api'
urlpatterns = [
    path('register/', RegistrationAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('refresh/', RefreshTokenAPIView.as_view()),
]