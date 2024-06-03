from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
# Create your tests here.
class RegistrationAPIViewTest(TestCase):
    def test_registration_success(self):
        url = reverse('auth_api:register')
        data = {'email': 'test@example.com', 'password': 'password123', 'role': 'seller', 'seller': {'name': 'test', 'phone': 'test', 'adress':'test'}}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_registration_duplicate_email(self):
        url = reverse('auth_api:register')
        data = {'email': 'test@example.com', 'password': 'password123', 'role': 'seller', 'seller': {'name': 'test', 'phone': 'test', 'adress':'test'}}
        self.client.post(url, data, format='json')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LoginAPIViewTest(APITestCase):
    def test_login_success(self):
        url = reverse('login')
        data = {'email': 'test@example.com', 'password': 'password123'}
        # Створюємо користувача з відповідним email та паролем перед викликом post
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {'email': 'test@example.com', 'password': 'invalid_password'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)