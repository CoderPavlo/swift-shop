from django.urls import path

from forecast.views import GenerateViewsAPIView


app_name = 'forecast'
urlpatterns = [
    path('generateViews/', GenerateViewsAPIView.as_view()),

]