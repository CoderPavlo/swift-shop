from django.db import models

from auth_api.models import Buyer, Seller
from category.models import SubCategory
from django.utils import timezone

class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

def upload_to(instance, filename):
    return 'goods/{filename}'.format(filename=filename)

class Good(models.Model):
    shop =  models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='shop', unique=False)
    name = models.CharField(max_length=255)
    rating = models.FloatField(default=0)
    price = models.FloatField()
    discount = models.FloatField(default=0)
    description = models.CharField(max_length=40000)
    count = models.IntegerField()
    image = models.ImageField(upload_to=upload_to)
    categories = models.ManyToManyField(SubCategory)
    tags = models.ManyToManyField(Tag)
    date_created = models.DateField(default=timezone.now)
    
    def __str__(self):
        return self.name
    
