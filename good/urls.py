from django.urls import path

from .views import GoodAPIView, GoodByShopGetAPIView, GoodForUserAllInfo, GoodForUserGetAPIView, SearchAPIView, SearchHistoryAPIView, SimilarGoodAPIView, TagAPIView, TagListAPIView, GoodByShopAllInfo

app_name = 'good'
urlpatterns = [
    path('goods/', GoodAPIView.as_view()),
    path('tags/', TagAPIView.as_view()),
    path('tags/add', TagListAPIView.as_view()),
    path('goodsByShop/', GoodByShopGetAPIView.as_view()),
    path('goodByShop/<int:id>/', GoodByShopAllInfo.as_view()),
    path('goodsForUser/', GoodForUserGetAPIView.as_view()),
    path('goodForUser/<int:id>/', GoodForUserAllInfo.as_view()),
    path('similar/', SimilarGoodAPIView.as_view()),
    path('searchHistory/', SearchHistoryAPIView.as_view()),
    path('search/', SearchAPIView.as_view()),
]