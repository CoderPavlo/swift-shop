from django.db import models

from auth_api.models import Buyer, Seller, User
from category.models import SubCategory
from django.utils import timezone

class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

def upload_to(instance, filename):
    return 'goods/{filename}'.format(filename=filename)

class Good(models.Model):
    shop =  models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='shop', unique=False) # Зв'язок з таблицею продавець
    name = models.CharField(max_length=255) # Назва товару
    rating = models.FloatField(default=0) # Рейтинг
    price = models.FloatField() # Ціна
    discount = models.FloatField(default=0) # Знижка у відсотках
    description = models.CharField(max_length=40000) # Опис товару
    count = models.IntegerField() # Наявна кількість
    image = models.ImageField(upload_to=upload_to) # Зображення товару
    categories = models.ManyToManyField(SubCategory) # Зв'язок багато до багатьох з таблицею підкатегорії
    tags = models.ManyToManyField(Tag) # Зв'язок багато до багатьох з таблицею теги
    date_created = models.DateField(default=timezone.now) # Дата створення
    
    def __str__(self):
        return self.name
    
class SearchHistory(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='user', unique=False)
    query = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.query
