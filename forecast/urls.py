from django.urls import path

from forecast.views import AdditionalStatisticsViews, Analysis, BuyerSegmentation, CategoryStatisticsViews, GenerateCartAPIView, GenerateOrdersAPIView, GenerateViewsAPIView, GoodStatisticsViews, PredictFutureValues, PredictUserActivityViews


app_name = 'forecast'
urlpatterns = [
    path('generateViews/', GenerateViewsAPIView.as_view()),
    path('generateCarts/', GenerateCartAPIView.as_view()),
    path('generateOrders/', GenerateOrdersAPIView.as_view()),
    path('userActivity/', PredictUserActivityViews.as_view()),
    path('categoryStatistics/', CategoryStatisticsViews.as_view()),
    path('additionalStatistics/', AdditionalStatisticsViews.as_view()),
    path('goodsStatistics/', GoodStatisticsViews.as_view()),
    path('predict/', PredictFutureValues.as_view()),
    path('segmentation/', BuyerSegmentation.as_view()),
    path('analysis/', Analysis.as_view()),

]