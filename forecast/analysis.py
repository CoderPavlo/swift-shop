from datetime import datetime, timedelta

from django.utils import timezone

import pandas as pd

from forecast.models import View
from good.models import Good
from order.models import Cart, Order, OrderGood
from statsmodels.tsa.arima.model import ARIMA
from django.db.models import Sum, Count, F, ExpressionWrapper, FloatField


def get_interval(period):
    # Визначаємо періодичність
    if period == 0:
        interval = timedelta(days=1)
    elif period == 1:
        interval = timedelta(weeks=1)
    elif period == 2:
        interval = timedelta(days=30)  # Приблизно один місяць
    return interval
    
def get_views(seller_id, interval):
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023

    

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

def get_orders(seller_id, interval):

# Кінцева дата
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023
# Заготовка масиву views
    orders = []

# Обчислення переглядів для кожного проміжку
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        count = Order.objects.filter(
            order_goods__good__shop__id=seller_id,
            date__gte=current_date,
            date__lt=next_date
        ).count()
    
        # Додаємо дані в масив views у вигляді кортежу
        orders.append((current_date, count))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(orders, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df

def get_orders_goods(seller_id, interval):

# Кінцева дата
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023
# Заготовка масиву views
    orders_goods = []

# Обчислення переглядів для кожного проміжку
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        orders = Order.objects.filter(
            order_goods__good__shop__id=seller_id,
            date__gte=current_date,
            date__lt=next_date
        )

        total_count = 0

        for order in orders:
            for order_good in order.order_goods.all():
                total_count += order_good.count
    
        # Додаємо дані в масив views у вигляді кортежу
        orders_goods.append((current_date, total_count))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(orders_goods, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df

def get_prices(seller_id, interval):

# Кінцева дата
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023
# Заготовка масиву views
    orders = []

# Обчислення переглядів для кожного проміжку
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        total_price = Order.objects.filter(
            order_goods__good__shop__id=seller_id,
            date__gte=current_date,
            date__lt=next_date
        ).aggregate(Sum('price'))
        # Додаємо дані в масив views у вигляді кортежу
        price_sum=total_price['price__sum']
        if(price_sum ==None): price_sum = 0
        orders.append((current_date, price_sum))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(orders, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df

def percent_difference(x, y):
    difference = x - y
    if y==0: return 100
    percentage = (difference / y) * 100

    return round(percentage, 1)

def forecast(data, interval):
    future = [data.index[-1] + interval]
    print(future)
    y=data['count']
    ARIMAmodel = ARIMA(y, order = (4, 3, 1))
    ARIMAmodel = ARIMAmodel.fit()
    y_pred = ARIMAmodel.get_forecast(1)
    y_pred_df = y_pred.conf_int(alpha = 0.05) 
    y_pred_df["count"] = ARIMAmodel.predict(start = y_pred_df.index[0], end = y_pred_df.index[-1])
    y_pred_df.index = future
    y_pred_out = pd.concat([data[-1:], y_pred_df["count"]])
    last_two_values = data['count'].tail(2)
    return {
        'data': data.reset_index(),
        'future_data': y_pred_out.reset_index(),
        'extra': round(last_two_values.iloc[1] - last_two_values.iloc[0], 3),
        'analysis': percent_difference(last_two_values.iloc[1], last_two_values.iloc[0]),
        'forecast': percent_difference(y_pred_out['count'].iloc[1], y_pred_out['count'].iloc[0]),
        'count': round(last_two_values.iloc[1], 3),
    }

def get_forecast(seller_id, period):
    interval = get_interval(period)
    views = get_views(seller_id, interval)
    orders = get_orders(seller_id, interval)
    orders_goods = get_orders_goods(seller_id, interval)
    prices = get_prices(seller_id, interval)
    return [
        {
            'title': 'Кількість переглядів товарів', 
            **forecast(views, interval),
        },
        {
            'title': 'Кількість замовлень', 
            **forecast(orders, interval)
        },
        {
            'title': 'Кількість куплених товарів', 
            **forecast(orders_goods, interval)
        },
        {
            'title': 'Кількість зароблених грошей', 
            **forecast(prices, interval)
        },
    ]

def get_category_statistics(seller_id, period, type):

    interval = get_interval(period)
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - interval
    if type==0:
        views = View.objects.filter(date__range=(start_date, end_date), good__shop__id=seller_id,)

        # Приєднати модель Good до моделі View
        views = views.select_related('good')

        # Отримати категорії SubCategory для кожного товару
        categories = views.values('good__categories__name')

        # Провести групування за категоріями SubCategory та підрахувати кількість переглядів для кожної категорії
        grouped_views = categories.annotate(count=Count('good__categories')).order_by('good__categories__name')
        return grouped_views
    elif type==1:
        # Отримати замовлення за певний проміжок часу
        orders = Order.objects.filter(
            date__range=(start_date, end_date), 
            order_goods__good__shop__id=seller_id,
        )

        # Отримати товари для кожного замовлення
        order_goods = OrderGood.objects.filter(
            order__in=orders
        )

        # Отримати категорії SubCategory для кожного товару
        subcategories = order_goods.values('good__categories__name')

        # Провести групування за категоріями SubCategory та підрахувати кількість замовлень для кожної категорії
        grouped_subcategories = subcategories.annotate(count=Count('order')).order_by('good__categories__name')
        return grouped_subcategories
    elif type==2:
        orders = Order.objects.filter(
            date__range=(start_date, end_date), 
            order_goods__good__shop__id=seller_id,
        )

        # Отримати товари для кожного замовлення та їх категорії
        order_goods = OrderGood.objects.filter(
            order__in=orders
        ).select_related('good')

        # Провести групування за товаром та категорією SubCategory та підрахувати кількість товарів та суму поля count для кожної категорії
        grouped_subcategories = order_goods.values('good__categories__name').annotate(
            count=Sum('count')
        ).order_by('good__categories__name')
        return grouped_subcategories
    else:
        # Отримати замовлення за певний проміжок часу
        orders = Order.objects.filter(
            date__range=(start_date, end_date),
            order_goods__good__shop__id=seller_id,
        )

        # Обчислити ціни з урахуванням знижки для кожного товару у замовленні
        order_goods = OrderGood.objects.filter(
            order__in=orders
        ).annotate(
            discounted_price=ExpressionWrapper(
                F('price') - F('price') * F('discount') / 100,
                output_field=FloatField()
            )
        )

        # Провести групування за категоріями SubCategory та підрахувати суму цін
        grouped_subcategories = order_goods.values('good__categories__name').annotate(
            count=Sum('discounted_price')
        ).order_by('good__categories__name')
        return grouped_subcategories

def get_new_goods(seller_id, interval):
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023

    
    goods = []
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        count = Good.objects.filter(
            shop__id=seller_id,
            date_created__gte=current_date,
            date_created__lt=next_date
        ).count()
    
        # Додаємо дані в масив views у вигляді кортежу
        goods.append((current_date, count))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(goods, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df

def get_goods(seller_id, interval):
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023
    goods = []
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        count = Good.objects.filter(
            shop__id=seller_id,
            date_created__gte=start_date,
            date_created__lt=next_date
        ).count()
    
        # Додаємо дані в масив views у вигляді кортежу
        goods.append((current_date, count))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(goods, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df

def get_carts(seller_id, interval):
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023
    carts = []
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        count = Cart.objects.filter(
            good__shop__id=seller_id,
            date__gte=current_date,
            date__lt=next_date
        ).count()
    
        # Додаємо дані в масив views у вигляді кортежу
        carts.append((current_date, count))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(carts, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df

def get_discount_goods(seller_id, interval):
    end_date = timezone.now()-timedelta(days=30)  # Закінчуємо 11.04.2024
    # Початкова дата
    start_date = end_date - timedelta(days=360)  # Починаємо з 11.04.2023
    goods = []
    current_date = start_date
    while current_date < end_date:
        # Фільтруємо перегляди за поточний проміжок
        next_date = current_date + interval
        orders = Order.objects.filter(
            order_goods__good__shop__id=seller_id,
            date__gte=current_date,
            date__lt=next_date,
            order_goods__discount__gt=0,
        )
        
        count = OrderGood.objects.filter(
            order__in=orders
        ).count()
    
        # Додаємо дані в масив views у вигляді кортежу
        goods.append((current_date, count))
    
        # Переміщуємося до наступного проміжку
        current_date = next_date

    # Створюємо DataFrame з views, де дата - це індекс
    df = pd.DataFrame(goods, columns=['date', 'count'])
    df.set_index('date', inplace=True)  # Встановлюємо дату як індекс
    return df
def get_additional_forecast(seller_id, period):
    interval = get_interval(period)
    new_goods = get_new_goods(seller_id, interval)
    goods = get_goods(seller_id, interval)
    carts = get_carts(seller_id, interval)
    discount_goods = get_discount_goods(seller_id, interval)
    return [
        {
            'title': 'Загальна кількість товарів', 
            **forecast(goods, interval),
        },
        {
            'title': 'Кількість нових товарів за період', 
            **forecast(new_goods, interval)
        },
        {
            'title': 'Кількість товарів в кошику', 
            **forecast(carts, interval)
        },
        {
            'title': 'Кількість товарів куплених по знижці', 
            **forecast(discount_goods, interval)
        },
    ]

def get_goods_statistics(seller_id, period):
    interval = get_interval(period)
    carts = get_carts(seller_id, interval).tail(12)
    views = get_views(seller_id, interval).tail(12)
    orders_goods = get_orders_goods(seller_id, interval).tail(12)

    return {
        'index': carts.index,
        'cart': carts['count'],
        'views': views['count'],
        'orders_goods': orders_goods['count'],
    }