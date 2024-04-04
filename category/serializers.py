from rest_framework import serializers
from .models import Category, SubCategory

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = Category
        fields = ['name']

class SubCategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, write_only=True, required=True)
    image = serializers.ImageField(write_only=True, required=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)

    class Meta:
        model = SubCategory
        fields = ['name', 'image', 'category']

class SubCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'image']

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']