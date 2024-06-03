from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
class PredictFutureValuesTestCase(APITestCase):
    def test_post_method(self):
        url = reverse('predict')  

        # Створення тестових даних, які будуть надсилатися у POST-запиті
        data = {
            'period': 0,  # Припустимо, що потрібно протестувати для періоду "день"
        }

        # Виклик методу POST API з тестовими даними
        response = self.client.post(url, data, format='json')

        # Перевірка статусу відповіді
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Перевірка різних аспектів відповіді
        self.assertIn('linear_regression_rmse', response.data)
        self.assertIn('arma', response.data)
        self.assertIn('arima', response.data)
        self.assertIn('sarimax', response.data)
