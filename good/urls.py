from django.urls import path

from .views import GoodAPIView, GoodByShopGetAPIView, TagAPIView, TagListAPIView, GoodByShopAllInfo

app_name = 'good'
urlpatterns = [
    path('goods/', GoodAPIView.as_view()),
    path('tags/', TagAPIView.as_view()),
    path('tags/add', TagListAPIView.as_view()),
    path('goodsByShop/', GoodByShopGetAPIView.as_view()),
    path('goodByShop/<int:id>/', GoodByShopAllInfo.as_view()),
]