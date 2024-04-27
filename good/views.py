import os
from rest_framework.views import APIView
from auth_api.authentication import JWTAuthentication
from good.models import Good, Tag
from good.serializers import GoodDetailSerializer, GoodListSerializer, GoodSerializer, TagSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from server import settings

class GoodAPIView(APIView):
    serializer_class = GoodSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        user = request.user
        seller = user.seller
        request.data['shop'] = str(seller.id)
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    
        
class TagAPIView(APIView):
    serializer_class = TagSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        serializer = self.serializer_class(Tag.objects.all(), many=True)
        return Response(serializer.data)
    

    
class TagListAPIView(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    
    def post(self, request):
        serializer = TagSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GoodByShopGetAPIView(APIView):
    serializer_class = GoodListSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        categoryId = self.request.query_params.get('categoryId')
        searchQuery = self.request.query_params.get('searchQuery')
        order = self.request.query_params.get('order')
        user = request.user
        seller = user.seller
        goods = Good.objects.filter(shop_id=seller.id)

        if categoryId and categoryId != "-1":
            goods = goods.filter(categories__id=categoryId)
        
        if order == "true":
            goods = goods.order_by('id')
        else:
            goods = goods.order_by('-id') 
        
        if searchQuery:
            goods = goods.filter(name__icontains=searchQuery)

        serializer = self.serializer_class(goods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GoodByShopAllInfo(APIView):
    serializer_class = GoodDetailSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request, id):
        good = Good.objects.get(id=id)
        serializer = self.serializer_class(good)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, id):
        try:
            # Знаходимо об'єкт за заданим id
            good = Good.objects.get(id=id)
        except Good.DoesNotExist:
            # Якщо об'єкт не знайдено, повертаємо відповідь з помилкою
            return Response({"message": "Товар не знайдено"}, status=status.HTTP_404_NOT_FOUND)

        # Видалення файлу зображення з сервера
        if good.image:
            image_path = os.path.join(settings.MEDIA_ROOT, str(good.image))
            if os.path.exists(image_path):
                os.remove(image_path)
        # Видаляємо об'єкт з бази даних
        good.delete()
        unused_tags = Tag.objects.filter(good__isnull=True)
        unused_tags.delete()
        # Повертаємо відповідь про успішне видалення
        return Response({"message": "Товар успішно видалено"}, status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, id):
        try:
            good = Good.objects.get(pk=id)
        except Good.DoesNotExist:
            return Response({"message": "Товар не знайдено"}, status=status.HTTP_404_NOT_FOUND)
        serializer = GoodListSerializer(good, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            unused_tags = Tag.objects.filter(good__isnull=True)
            unused_tags.delete()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)