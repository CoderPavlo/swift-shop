from django.shortcuts import render
import random
from datetime import datetime, timedelta

from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from auth_api.models import Buyer
from forecast.serializers import ViewSerializer
from good.models import Good
from rest_framework.response import Response
from rest_framework import status

class GenerateViewsAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = ViewSerializer

    def post(self, request):
        buyers = Buyer.objects.all()
        goods = Good.objects.all()

        # Дата, за яку потрібно згенерувати перегляди (за попередній рік)
        current_date = timezone.now()
        one_year_ago = current_date - timedelta(days=365)

        views = []
        # Згенерувати перегляди
        for buyer in buyers:
        # Випадково вибираємо 100 товарів для поточного користувача
            random_goods = random.sample(list(goods), 100)
            for good in random_goods:
                # Згенерувати випадкову дату перегляду в діапазоні за попередній рік
                view_date = one_year_ago + timedelta(days=random.randint(0, 364))
                views.append({
                    'buyer': buyer.id,
                    'good': good.id,
                    'date': view_date.date()
                })
        views.sort(key=lambda x: x['date'])
        serializer = self.serializer_class(data=views, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
        