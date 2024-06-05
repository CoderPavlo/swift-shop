from random import shuffle
from django.conf import settings
import jwt
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from auth_api.models import User
from good.models import Good
from .serializers import CategoryListSerializer, CategorySerializer, SubCategoryListSerializer, SubCategorySerializer
from .models import Category, SubCategory
from rest_framework.permissions import IsAdminUser
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth_api.authentication import JWTAuthentication

class CategoryPostAPIView(APIView):
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class SubCategoryAPIView(APIView):
    serializer_class = SubCategorySerializer
    permission_classes = (IsAdminUser, )
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SubCategoryGetAPIView(APIView):
    permission_classes = (AllowAny, )
    authentication_classes = [JWTAuthentication]
    serializer_class = SubCategoryListSerializer

    def get(self, request):
        cats = list(SubCategory.objects.all())
        shuffle(cats)
        serializer = self.serializer_class(cats, many=True)
        return Response(serializer.data)
    
class SubCategoryByShopGetAPIView(APIView):
    serializer_class = SubCategoryListSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        seller = user.seller
        goods = Good.objects.filter(shop_id=seller.id)
        
        # Отримати всі категорії з товарів
        categories = goods.values_list('categories__id', flat=True)

        # Знайти унікальні категорії
        unique_categories = set(categories)

        # Отримати об'єкти SubCategory за унікальними id
        subcategories = SubCategory.objects.filter(id__in=unique_categories)

        # Серіалізувати об'єкти SubCategory
        serializer = self.serializer_class(subcategories, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



class CategoryGetAPIView(APIView):
    permission_classes = (AllowAny, IsAuthenticated)
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        serialized_data = []

        for category in Category.objects.all():
            category_data = CategoryListSerializer(category).data
            subcategories_data = SubCategoryListSerializer(category.subcategory.all(), many=True).data
            category_data['subcategories'] = list(subcategories_data)
            serialized_data.append(category_data)

        return Response(serialized_data)