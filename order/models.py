from django.db import models

from auth_api.models import Buyer, Seller
from good.models import Good

class OrderGood(models.Model):
    good = models.ForeignKey(Good, on_delete=models.CASCADE, related_name='good', unique=False)
    count = models.IntegerField(default=1)
    price = models.FloatField()
    discount = models.FloatField(default=0)

    def __str__(self):
        return self.good.name
    
class Cart(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name='buyer', unique=False)
    good = models.ForeignKey(Good, on_delete=models.CASCADE, related_name='cart_good', unique=False)
    count = models.IntegerField(default=1)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.buyer.first_name + ' - ' + self.good.name
    
class Promocode(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='seller', unique=False)
    code = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    discount = models.FloatField()
    goods = models.ManyToManyField(Good)

    def __str__(self):
        return self.code

class UserPromocode(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name='user_buyer', unique=False)
    promocode = models.ForeignKey(Promocode, on_delete=models.CASCADE, related_name='user_promocode', unique=False)

    def __str__(self):
        return self.buyer.first_name + ' - ' + self.promocode.code
      
class Order(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name='order_buyer', unique=False)
    order_goods = models.ManyToManyField(OrderGood)
    promocode = models.ForeignKey(Promocode, on_delete=models.CASCADE, related_name='order_promocode', unique=False, blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    price = models.FloatField()
    STATUS_CHOICES = [
        (0, 'PROCESSING'),
        (1, 'PAID'),
        (2, 'SENT'),
        (3, 'DELIVERED'),
    ]
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)

    def __str__(self):
        return self.buyer.first_name