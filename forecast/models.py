from django.db import models

from auth_api.models import Buyer
from good.models import Good

class View(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name='buyer_view', unique=False)
    good = models.ForeignKey(Good, on_delete=models.CASCADE, related_name='good_view', unique=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'view ' + self.buyer.first_name + ' ' + self.good.name