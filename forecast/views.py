from django.shortcuts import render
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from auth_api.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
import random
from datetime import date, datetime, timedelta
from sklearn.linear_model import LinearRegression
from django.utils import timezone
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import MinMaxScaler

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

from order.models import Cart, Order
from order.serializers import CartSerializer, OrderGoodSerializer, OrderSerializer
from django.db.models import Count, Sum, Avg

from server import settings

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
    
class PredictFutureValues(APIView):
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
        end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
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
        period = request.data.get('period', 0)  # 0-day, 1-week, 2-month
        interval = self.get_interval(period)
        # views = self.get_views(seller_id, interval)
        static_file_path = settings.STATIC_ROOT + "/Sales_Data_Analysis.csv"
        data = pd.read_csv(static_file_path)

        # Перетворення колонки "Order Date" в формат дати
        data['Order Date'] = pd.to_datetime(data['Order Date'])
        # Згрупуємо дані за проміжками довжиною в інтервал та просумуємо кількість продажів за цей період
        sales_sum = data.groupby(pd.Grouper(key='Order Date', freq=interval)).size().reset_index(name='count')[:-1]
        # Створимо новий DataFrame з індексами, що позначають початок проміжку та колонкою count
        data = sales_sum.set_index('Order Date')
        train = data[:-1]
        test = data[-1:]
        plt.plot(train, color = "black", label='Історичні дані')
        plt.plot(pd.concat([train[-1:], test]), color = "red", label='Реальне значення')
        plt.ylabel('Кількість')
        plt.xlabel('Дата')
        plt.xticks(rotation=45)
        plt.title("Прогнозування значення продажів")
        y = train['count']
        
        lin_reg = LinearRegression()
        lin_reg.fit(train.index.map(lambda x: x.toordinal()).values.reshape(-1, 1), y)
        y_pred_lin_reg = lin_reg.predict(test.index.map(lambda x: x.toordinal()).values.reshape(-1, 1))
        y_pred_out = pd.concat([train[-1:], pd.DataFrame(data=y_pred_lin_reg, index=test.index, columns=['count'])]) 
        plt.plot(y_pred_out, color='orange', label='Лінійна регресія')
        linear_regression_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_lin_reg))
        # Розрахунок RMSE для лінійної регресії
        ARMAmodel = SARIMAX(y, order = (1, 1, 1))
        ARMAmodel = ARMAmodel.fit()
        y_pred = ARMAmodel.get_forecast(len(test.index))
        y_pred_df = y_pred.conf_int(alpha = 0.05) 
        y_pred_df["count"] = ARMAmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
        y_pred_df.index = test.index
        y_pred_out = pd.concat([train[-1:], y_pred_df["count"]]) 
        plt.plot(y_pred_out, color='green', label = 'ARMA')
        arma_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_df["count"]))

        ARIMAmodel = ARIMA(y, order = (1, 1, 1))
        ARIMAmodel = ARIMAmodel.fit()

        y_pred = ARIMAmodel.get_forecast(len(test.index))
        y_pred_df = y_pred.conf_int(alpha = 0.05) 
        y_pred_df["count"] = ARIMAmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
        y_pred_df.index = test.index
        y_pred_out = pd.concat([train[-1:], y_pred_df["count"]]) 
        plt.plot(y_pred_out, color='Yellow', label = 'ARIMA')
        arima_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_df["count"]))
        
        SARIMAXmodel = SARIMAX(y, order = (1, 1, 1), seasonal_order=(1,1,1,12))
        SARIMAXmodel = SARIMAXmodel.fit()

        y_pred = SARIMAXmodel.get_forecast(len(test.index))
        y_pred_df = y_pred.conf_int(alpha = 0.05) 
        y_pred_df["count"] = SARIMAXmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
        y_pred_df.index = test.index
        y_pred_out = pd.concat([train[-1:], y_pred_df["count"]]) 
        plt.plot(y_pred_out, color='Blue', label = 'SARIMA')
        plt.legend()


        plt.show()
        sarimax_rmse = np.sqrt(mean_squared_error(test["count"].values, y_pred_df["count"]))
        result = {
            'linear_regression_rmse': linear_regression_rmse,
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
    
class BuyerSegmentation(APIView):
    def get(self, request):
        # Отримання параметра shop_id з запиту, якщо він передано
        shop_id = 2

        # Отримання усіх покупців з бази даних
        buyers = Buyer.objects.all()

        # Створення порожнього датафрейму
        dataframe = []

        for buyer in buyers:
            # Розрахунок віку покупця на основі року, місяця та дня народження
            birth_date = date(buyer.year, buyer.month, buyer.day)
            today = date.today()
            age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

            # Отримання кількості переглядів товарів певного магазину
            views_count = View.objects.filter(buyer=buyer, good__shop_id=shop_id).count()

            # Отримання кількості товарів у кошику певного магазину
            cart_count = Cart.objects.filter(buyer=buyer, good__shop_id=shop_id).count()
            

            # Отримання кількості замовлень певного магазину
            order_count = Order.objects.filter(buyer=buyer, order_goods__good__shop_id=shop_id).count()

            # Отримання суми цін усіх замовлень певного магазину
            orders_prices_sum = Order.objects.filter(buyer=buyer, order_goods__good__shop_id=shop_id).aggregate(Sum('price'))['price__sum']
            average_order_price = Order.objects.filter(buyer=buyer, order_goods__good__shop_id=shop_id).aggregate(Avg('price'))['price__avg']
            # Додавання запису про покупця до датафрейму
            dataframe.append({
                'buyer_id': buyer.id,
                'age': age,
                'gender': buyer.gender,  
                'views_count': views_count,
                'size_cart': cart_count,
                'order_count': order_count,
                'orders_prices_sum': orders_prices_sum if orders_prices_sum else 0,  # Якщо сума є None, то 0
                'average_order_price': average_order_price if average_order_price else 0,
            })
        data = pd.DataFrame(dataframe)
        X_cluster = data[['age', 'views_count', 'size_cart', 'order_count']]

        # Обрання кількості кластерів (можна провести аналіз для вибору оптимальної кількості)
        num_clusters = 3

        # Модель кластеризації
        kmeans = KMeans(n_clusters=num_clusters, random_state=42)
        kmeans.fit(X_cluster)

        # Додавання стовпця з кластерами до даних
        data['cluster'] = kmeans.labels_
        # Створення списків для підписів кластерів
        cluster_labels_age_activity = ['Молоді з високою активністю', 'Середнього віку з помірною активністю', 'Старші з низькою активністю']
        cluster_labels_order_size = ['Великі замовлення та кошики', 'Помірні замовлення та кошики', 'Невеликі замовлення та кошики']
        cluster_labels_height_activity = ['Молоді з високим зростом та активністю', 'Середнього віку з помірним зростом та активністю', 'Старші з низьким зростом та активністю']

        # Створення графіка для кожного з типів кластерів
        plt.figure(figsize=(15, 5))

        # Кластери за віком та активністю покупців
        plt.subplot(1, 3, 1)
        for cluster_num in range(num_clusters):
            cluster_data = data[data['cluster'] == cluster_num]
            plt.scatter(cluster_data['age'], cluster_data['views_count'], label=cluster_labels_age_activity[cluster_num])
        plt.xlabel('Age')
        plt.ylabel('Views Count')
        plt.title('Clusters by Age and Activity')
        plt.legend()

        # Кластери за обсягом замовлень та розміром кошика
        plt.subplot(1, 3, 2)
        for cluster_num in range(num_clusters):
            cluster_data = data[data['cluster'] == cluster_num]
            plt.scatter(cluster_data['order_count'], cluster_data['size_cart'], label=cluster_labels_order_size[cluster_num])
        plt.xlabel('Order Count')
        plt.ylabel('Cart Size')
        plt.title('Clusters by Order Size and Cart Size')
        plt.legend()

        # Кластери за зростом та активністю покупців
        plt.subplot(1, 3, 3)
        for cluster_num in range(num_clusters):
            cluster_data = data[data['cluster'] == cluster_num]
            plt.scatter(cluster_data['age'], cluster_data['order_count'], label=cluster_labels_height_activity[cluster_num])
        plt.xlabel('Age')
        plt.ylabel('Order Count')
        plt.title('Clusters by Height and Activity')
        plt.legend()

        plt.tight_layout()
        plt.show()
        return Response(data)

class Analysis(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        static_file_path = settings.STATIC_ROOT + "/Sales_Data_Analysis.csv"
        data = pd.read_csv(static_file_path)

        # Перетворення колонки "Order Date" в формат дати
        data['Order Date'] = pd.to_datetime(data['Order Date'])

        # Створення колонки "Day of Week" з днями тижня
        data['Day'] = data['Order Date'].dt.dayofweek

        # Групування даних за 'Month', 'Day of Week', 'Hour' та обчислення кількості замовлень
        grouped_data = data.groupby(['Month', 'Day', 'Hour']).size().reset_index(name='Sales Count')

        # Відокремлюємо функції (ознаки) і цільову змінну
        features = ['Month', 'Day', 'Hour']
        target = 'Sales Count'
        X = grouped_data[features]
        y = grouped_data[target]

        # Кодуємо категоріальні ознаки
        X = pd.get_dummies(X)

        # Розділяємо дані на навчальний та тестовий набори
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Ініціалізуємо та навчаємо модель лінійної регресії
        model = LinearRegression()
        model.fit(X_train, y_train)

        # Оцінюємо точність моделі на тестовому наборі
        accuracy = model.score(X_test, y_test)

        return Response({'label': ['Місяць', 'День', 'Година'], 'x':[X['Month'], X['Day'], X['Hour']], 'y': y, 'accuracy': round(accuracy, 3), 'coefficients': np.round(model.coef_, 3)})