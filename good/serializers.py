from rest_framework import serializers

from category.models import SubCategory
from category.serializers import SubCategoryListSerializer
from good.models import Good, SearchHistory, Tag

class GoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Good
        fields = '__all__'

class GoodListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Good
        fields = ['id', 'name', 'rating', 'price', 'discount', 'description', 'count', 'image', 'categories', 'tags']

class GoodCardDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Good
        fields = ['id', 'name', 'rating', 'price', 'discount', 'description', 'count', 'image']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

# class TagListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Tag
#         fields = ['tags']

class GoodDetailSerializer(serializers.ModelSerializer):
    # Вкладений серіалізатор для категорій
    categories = SubCategoryListSerializer(many=True, read_only=True)
    # Вкладений серіалізатор для тегів
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Good
        fields = ['id', 'name', 'price', 'discount', 'description', 'count', 'image', 'categories', 'tags']

class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ['query', 'user']