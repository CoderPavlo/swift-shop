from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
def upload_to(instance, filename):
    return 'categories/{filename}'.format(filename=filename)

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategory')
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to=upload_to)
    
    def __str__(self):
        return self.name