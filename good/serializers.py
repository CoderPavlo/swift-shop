from rest_framework import serializers

from category.models import SubCategory
from good.models import Good, Tag

class GoodSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=True)
    class Meta:
        model = Good
        fields = ['shop', 'name', 'rating', 'price', 'discount', 'description', 'count', 'image', 'categories', 'tags']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

# class TagListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Tag
#         fields = ['tags']