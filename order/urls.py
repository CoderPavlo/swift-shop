from django.urls import path

from order.views import CartAPIView, CartToOrderAPIView

app_name = 'order'
urlpatterns = [
    path('cart/', CartAPIView.as_view()),
    path('cartToOrder/', CartToOrderAPIView.as_view()),

]