from django.urls import path

from order.views import CartAPIView, CartToOrderAPIView, OrderAPIView

app_name = 'order'
urlpatterns = [
    path('cart/', CartAPIView.as_view()),
    path('orders/', OrderAPIView.as_view()),
    path('cartToOrder/', CartToOrderAPIView.as_view()),

]