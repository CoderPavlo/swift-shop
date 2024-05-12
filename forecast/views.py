from django.shortcuts import render
from auth_api.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
import random
from datetime import datetime, timedelta

from django.utils import timezone
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from auth_api.models import Buyer
from forecast.analysis import get_additional_forecast, get_category_statistics, get_forecast, get_goods_statistics
from forecast.models import View
from forecast.serializers import ViewSerializer
from good.models import Good
from rest_framework.response import Response
from rest_framework import status
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima.model import ARIMA

from order.models import Order
from order.serializers import CartSerializer, OrderGoodSerializer, OrderSerializer

class GenerateOrdersAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = OrderSerializer

    def post(self, request):
        buyers = Buyer.objects.all()
        goods = Good.objects.all()

        # Дата, за яку потрібно згенерувати перегляди (за попередній рік)
        current_date = timezone.now()
        one_year_ago = current_date - timedelta(days=365)

        orders = []
        # Згенерувати перегляди
        for buyer in buyers:
        # Випадково вибираємо 100 товарів для поточного користувача
            random_goods = random.sample(list(goods), 5)
            order_goods=[]
            for good in random_goods:
                # Згенерувати випадкову дату перегляду в діапазоні за попередній рік
                order_good = {
                    'good': good.id,
                    'price': good.price,
                    'discount': good.discount
                }
                serializer = OrderGoodSerializer(data=order_good)
                serializer.is_valid(raise_exception=True)
                instance = serializer.save()
                order_goods.append(instance)
            
            i=0
            
            while i<len(order_goods):
                count = 1
                if i+2<len(order_goods):
                    count = random.randint(1, 2)
                date = one_year_ago + timedelta(days=random.randint(0, 364))
                price = order_goods[i].price - order_goods[i].price * (order_goods[i].discount/100)
                order_goods_id=[order_goods[i].id]
                i+=1
                if(count==2):
                    price += order_goods[i].price - order_goods[i].price * (order_goods[i].discount/100)
                    order_goods_id.append(order_goods[i].id)
                    i+=1
                orders.append({
                'buyer': buyer.id,
                'order_goods': order_goods_id,
                'price': price,
                'date': date.date()
                })
                
        orders.sort(key=lambda x: x['date'])
        serializer = self.serializer_class(data=orders, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class GenerateCartAPIView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = CartSerializer

    def post(self, request):
        buyers = Buyer.objects.all()
        goods = Good.objects.all()

        # Дата, за яку потрібно згенерувати перегляди (за попередній рік)
        current_date = timezone.now()
        one_year_ago = current_date - timedelta(days=365)

        carts = []
        # Згенерувати перегляди
        for buyer in buyers:
        # Випадково вибираємо 100 товарів для поточного користувача
            random_goods = random.sample(list(goods), 10)
            for good in random_goods:
                # Згенерувати випадкову дату перегляду в діапазоні за попередній рік
                view_date = one_year_ago + timedelta(days=random.randint(0, 364))
                carts.append({
                    'buyer': buyer.id,
                    'good': good.id,
                    'date': view_date.date()
                })
        carts.sort(key=lambda x: x['date'])
        serializer = self.serializer_class(data=carts, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
    
class PredictFutureViews(APIView):
    permission_classes = (AllowAny, )


    def get_interval(self, period):
        # Визначаємо періодичність
        if period == 0:
            interval = timedelta(days=1)
        elif period == 1:
            interval = timedelta(weeks=1)
        elif period == 2:
            interval = timedelta(days=30)  # Приблизно один місяць
        return interval

    def get_views(self, seller_id, interval):
    
    # Кінцева дата
        end_date = timezone.now()  # Закінчуємо 11.04.2024
        # Початкова дата
        start_date = end_date - timedelta(days=365)  # Починаємо з 11.04.2023
    # Заготовка масиву views
        views = []
    
    # Обчислення переглядів для кожного проміжку
        current_date = start_date
        while current_date < end_date:
            # Фільтруємо перегляди за поточний проміжок
            next_date = current_date + interval
            count = View.objects.filter(
                good__shop__id=seller_id,
                date__gte=current_date,
                date__lt=next_date
            ).count()
        
            # Додаємо дані в масив views у вигляді кортежу
            views.append((current_date, count))
        
            # Переміщуємося до наступного проміжку
            current_date = next_date
    
        # Створюємо DataFrame з views, де дата - це індекс
        df = pd.DataFrame(views, columns=['date', 'count'])
        df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
        return df  


    def post(self, request):
        # seller_id = request.user.seller
        seller_id = 2  # Тимчасове значення для ілюстрації
        period = request.data.get('period', 2)  # 0-day, 1-week, 2-month
        interval = self.get_interval(period)
        views = self.get_views(seller_id, interval)

        train = views[:-1]
        test = views[-1:]
        plt.plot(train, color = "black")
        plt.plot(pd.concat([train[-1:], test]), color = "red")
        plt.ylabel('Views')
        plt.xlabel('Date')
        plt.xticks(rotation=45)
        plt.title("Train/Test split for data")
        y = train['count']
        ARMAmodel = SARIMAX(y, order = (4, 3, 1))
        ARMAmodel = ARMAmodel.fit()
        y_pred = ARMAmodel.get_forecast(len(test.index))
        y_pred_df = y_pred.conf_int(alpha = 0.05) 
        y_pred_df["count"] = ARMAmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
        y_pred_df.index = test.index
        y_pred_out = pd.concat([train[-1:], y_pred_df["count"]]) 
        plt.plot(y_pred_out, color='green', label = 'Predictions')
        arma_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_df["count"]))

        ARIMAmodel = ARIMA(y, order = (4, 3, 1))
        ARIMAmodel = ARIMAmodel.fit()

        y_pred = ARIMAmodel.get_forecast(len(test.index))
        y_pred_df = y_pred.conf_int(alpha = 0.05) 
        y_pred_df["count"] = ARIMAmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
        y_pred_df.index = test.index
        y_pred_out = pd.concat([train[-1:], y_pred_df["count"]]) 
        plt.plot(y_pred_out, color='Yellow', label = 'ARIMA Predictions')
        arima_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_df["count"]))
        
        SARIMAXmodel = SARIMAX(y, order = (4, 3, 1), seasonal_order=(2,2,2,12))
        SARIMAXmodel = SARIMAXmodel.fit()

        y_pred = SARIMAXmodel.get_forecast(len(test.index))
        y_pred_df = y_pred.conf_int(alpha = 0.05) 
        y_pred_df["count"] = SARIMAXmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
        y_pred_df.index = test.index
        y_pred_out = pd.concat([train[-1:], y_pred_df["count"]]) 
        plt.plot(y_pred_out, color='Blue', label = 'SARIMA Predictions')
        plt.legend()


        plt.show()
        sarimax_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_df["count"]))
        result = {
            'arma': arma_rmse,
            'arima': arima_rmse,
            'sarimax': sarimax_rmse,
        }
        return Response(result, status=status.HTTP_200_OK)
    

class PredictUserActivityViews(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        period = self.request.query_params.get('period')
        seller_id=request.user.seller.id
        return Response(get_forecast(seller_id, int(period)), status=status.HTTP_200_OK)
    
class AdditionalStatisticsViews(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        period = self.request.query_params.get('period')
        seller_id=request.user.seller.id
        return Response(get_additional_forecast(seller_id, int(period)), status=status.HTTP_200_OK)
        
class GoodStatisticsViews(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        period = self.request.query_params.get('period')
        seller_id=request.user.seller.id
        return Response(get_goods_statistics(seller_id, int(period)), status=status.HTTP_200_OK)

class CategoryStatisticsViews(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        period = self.request.query_params.get('period')
        type = self.request.query_params.get('type')
        seller_id=2
        return Response(get_category_statistics(seller_id, int(period), int(type)), status=status.HTTP_200_OK)