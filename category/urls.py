from django.urls import path

from .views import CategoryPostAPIView, CategoryGetAPIView, SubCategoryAPIView, SubCategoryGetAPIView

app_name = 'category'
urlpatterns = [
    path('post/', CategoryPostAPIView.as_view()),
    path('get/', CategoryGetAPIView.as_view()),
    path('sub/post/', SubCategoryAPIView.as_view()),
    path('sub/get/', SubCategoryGetAPIView.as_view()),
]