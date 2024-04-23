from django.urls import path

from .views import GoodAPIView, TagAPIView, TagListAPIView

app_name = 'good'
urlpatterns = [
    path('goods/', GoodAPIView.as_view()),
    path('tags/', TagAPIView.as_view()),
    path('tags/add', TagListAPIView.as_view()),
]