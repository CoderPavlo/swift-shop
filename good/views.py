import os
from rest_framework.views import APIView
from auth_api.authentication import JWTAuthentication
from forecast.models import View
from forecast.serializers import ViewSerializer
from good.models import Good, SearchHistory, Tag
from good.serializers import GoodCardDataSerializer, GoodDetailSerializer, GoodListSerializer, GoodSerializer, SearchHistorySerializer, TagSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from good.stopwords import UKRAINIAN_STOP_WORDS
from order.models import Cart
from server import settings
from server.paginate import paginate
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from itertools import chain
from django.db.models import Count, Q
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
            goods = goods.order_by('-id')
        else:
            goods = goods.order_by('id') 
        
        if searchQuery:
            goods = goods.filter(name__icontains=searchQuery)
        serializer = self.serializer_class(goods, many=True)
        return paginate(serializer.data, request)
    
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
    
class GoodForUserGetAPIView(APIView):
    serializer_class = GoodCardDataSerializer
    permission_classes = (AllowAny, IsAuthenticated)
    authentication_classes = [JWTAuthentication]

    def get_recommended_goods(self, id):
        # Отримання переглядів користувача
        user_views = View.objects.filter(buyer_id=id)
        # Отримання товарів з кошика користувача
        user_cart = Cart.objects.filter(buyer_id=id)
        # Об'єднання переглядів та товарів з кошика користувача
        interactions = sorted(chain(user_views, user_cart), key=lambda x: x.date, reverse=True)
        # Сформування масиву з 10 товарів
        interacted_goods = [interaction.good for interaction in interactions][:10]
        # Отримання всіх товарів, крім цільових
        all_goods = Good.objects.exclude(id__in=[good.id for good in interacted_goods])
        # Створення корпусу даних для векторизації
        corpus = [good.description + ' '.join([tag.name for tag in good.tags.all()]) for good in interacted_goods] + \
         [good.description + ' '.join([tag.name for tag in good.tags.all()]) for good in all_goods]
        # Векторизація тексту опису товарів зі своїм списком слів-зупинок
        vectorizer = TfidfVectorizer(stop_words=UKRAINIAN_STOP_WORDS)
        tfidf_matrix = vectorizer.fit_transform(corpus)
        # Розрахунок косинусної схожості між описами товарів
        cosine_similarities = linear_kernel(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        # Створення списку подібних товарів
        similar_goods = []
        for idx, similarity in enumerate(cosine_similarities):
            if idx < len(all_goods):
                similar_goods.append({
                    'id': all_goods[idx].id,
                    'name': all_goods[idx].name,
                    'rating': all_goods[idx].rating, 
                    'price': all_goods[idx].price, 
                    'discount': all_goods[idx].discount, 
                    'description': all_goods[idx].description, 
                    'count': all_goods[idx].count, 
                    'image': all_goods[idx].image,
                    'similarity': similarity
                })
        # Сортування за схожістю
        similar_goods.sort(key=lambda x: x['similarity'], reverse=True)
        return similar_goods
    
    def get(self, request):
        tab = self.request.query_params.get('tab')
        
        if tab == '0':
            goods = self.get_recommended_goods(request.user.buyer.id)
        elif tab=='1':
            goods = Good.objects.annotate(view_count=Count('good_view')).order_by('-view_count')
        else:
            goods = Good.objects.all().order_by('-date_created')
        serializer = self.serializer_class(goods, many=True, partial=True)
        return paginate(serializer.data, request)
        
class GoodForUserAllInfo(APIView):
    serializer_class = GoodListSerializer
    permission_classes = (AllowAny, IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request, id):
        good = Good.objects.get(id=id)
        if request.user.buyer:
            data={
                'buyer': request.user.buyer.id,
                'good': good.id,
            }
            serializer = ViewSerializer(data=data)
            serializer.is_valid(raise_exception=True)      
            serializer.save()
        serializer = self.serializer_class(good)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SimilarGoodAPIView(APIView):
    serializer_class = GoodCardDataSerializer
    permission_classes = (AllowAny, IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        id = self.request.query_params.get('id')
        good = Good.objects.get(id=id)
        # Отримання всіх товарів, крім цільового
        all_goods = Good.objects.exclude(pk=id)
        # Створення корпусу даних для векторизації
        corpus = [good.description + ' '.join([tag.name for tag in good.tags.all()])] + \
         [good.description + ' '.join([tag.name for tag in good.tags.all()]) for good in all_goods]
        # Векторизація тексту опису товарів зі своїм списком слів-зупинок
        vectorizer = TfidfVectorizer(stop_words=UKRAINIAN_STOP_WORDS)
        tfidf_matrix = vectorizer.fit_transform(corpus)
        # Розрахунок косинусної схожості між описами товарів
        cosine_similarities = linear_kernel(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        # Створення списку подібних товарів
        similar_goods = []
        for idx, similarity in enumerate(cosine_similarities):
            similar_goods.append({
                'id': all_goods[idx].id,
                'name': all_goods[idx].name,
                'rating': all_goods[idx].rating, 
                'price': all_goods[idx].price, 
                'discount': all_goods[idx].discount, 
                'description': all_goods[idx].description, 
                'count': all_goods[idx].count, 
                'image': all_goods[idx].image,
                'similarity': similarity
            })
        # Сортування за схожістю
        similar_goods.sort(key=lambda x: x['similarity'], reverse=True)
        serializer = self.serializer_class(similar_goods, many=True, partial=True)
        return paginate(serializer.data, request)
    
class SearchHistoryAPIView(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        user = request.user
        query_param = request.GET.get('query', '')
        
        if query_param:
            # Пошук за запитом, нечутливий до регістру, і фільтрація по користувачу
            search_history = SearchHistory.objects.filter(user=user, query__icontains=query_param).order_by('-date')[:10]
        else:
            # Якщо запит порожній, повертаємо останні 10 елементів для користувача
            search_history = SearchHistory.objects.filter(user=user).order_by('-date')[:10]
        
        # Отримуємо лише поле 'query' як список рядків
        search_history_queries = [record.query for record in search_history]
        
        return Response(search_history_queries, status=status.HTTP_200_OK)
    
class SearchAPIView(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]
    serializer_class = GoodCardDataSerializer

    def get(self, request):
        query = request.GET.get('query', '')
        category = int(request.GET.get('category', '-1'))
        order = request.GET.get('order', '')
        price_from = request.GET.get('priceFrom', '')
        price_to = request.GET.get('priceTo', '')
        
        # Формуємо базовий queryset для пошуку
        queryset = Good.objects.all()
        # Фільтруємо за текстовим запитом
        if query!="":
            existing_search_history = SearchHistory.objects.filter(user=request.user.id, query=query).exists()
            print(1)
            if not existing_search_history:
                # Якщо такого запису ще немає, зберігаємо його
                search_history_ser = SearchHistorySerializer(data={'query': query, 'user': request.user.id})
                search_history_ser.is_valid(raise_exception=True)
                print(2)
                search_history_ser.save()
            queryset = queryset.filter(Q(description__icontains=query) | Q(name__icontains=query))
        print(3)

        # Фільтруємо за категорією, якщо вона вказана
        if category!=-1:
            queryset = queryset.filter(categories__id=category)
        
        # Фільтруємо за ціною, якщо вказані межі
        if price_from!='':
            price_from = float(price_from)
            queryset = queryset.filter(price__gte=price_from)
        
        if price_to!='':
            price_to = float(price_to)
            if price_to > 0 and (price_from=='' or price_to > price_from):
                queryset = queryset.filter(price__lte=price_to)

        # Сортуємо, якщо потрібно
        if order is not None:
            if order.lower() == 'true':
                queryset = queryset.order_by('price')
            else:
                queryset = queryset.order_by('-price')

        serializer = self.serializer_class(queryset, many=True, partial=True)
        return paginate(serializer.data, request)


        