from django.shortcuts import render
from rest_framework.views import APIView
from auth_api.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from good.models import Good
from server.paginate import paginate
from order.models import Cart, Order, OrderGood, Promocode
from order.serializers import CartGroupedSerializer, CartSerializer, OrderDetailSerializer, OrderGoodSerializer, OrderSerializer
class CartAPIView(APIView):
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        id = self.request.user.buyer.id
        carts = Cart.objects.filter(buyer_id=id).order_by('id')
        carts = carts.order_by('-id') 
        grouped_carts = []
        current_group = []

        prev_seller = None
        for cart in carts:
            seller = cart.good.shop
            if not prev_seller or seller.id != prev_seller.id:
                if prev_seller and current_group:
                    grouped_carts.append({'seller': prev_seller, 'carts': current_group})
                current_group = [cart]
                prev_seller = seller
            else:
                current_group.append(cart)
        
        if current_group:
            grouped_carts.append({'seller': prev_seller, 'carts': current_group})
        serializer = CartGroupedSerializer(grouped_carts, many=True) 
        return paginate(serializer.data, request, 10)

    def post(self, request):
        buyer_id = request.user.buyer.id
        good_id = request.data.get('good', None)
        count = request.data.get('count', 1)
    
        # Перевірка чи товар вже є у корзині користувача
        existing_item = Cart.objects.filter(buyer=buyer_id, good=good_id).first()
    
        if existing_item:
            # Якщо товар вже є у корзині, оновлюємо кількість
            existing_item.count = count
            existing_item.save()
            return Response(status=status.HTTP_200_OK)
        # Якщо товару немає у корзині, додаємо новий запис
        cart_data = {
            'buyer': buyer_id,
            'good': good_id,
            'count': count,
        }
        serializer = self.serializer_class(data=cart_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        id = self.request.query_params.get('id')
        cart = Cart.objects.get(id=id)
        cart.delete()
        return Response({"message": "Товар успішно видалено з корзини"}, status=status.HTTP_204_NO_CONTENT)

class OrderAPIView(APIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        good_id = request.data.pop('good', None)
        good = Good.objects.get(id=good_id)
        good_data = {
            'good': good_id,
            'price': good.price,
            'discount': good.discount,
            'count': request.data.pop('count', 1),
        } 
        good_serializer = OrderGoodSerializer(data=good_data)
        good_serializer.is_valid(raise_exception=True)
        good = good_serializer.save()

        price = (good.price - good.price * (good.discount/100)) * good.count
        promocode_id = request.data.pop('promocode_id', None)
        if promocode_id :
            promocode = Promocode.objects.get(id=promocode_id)
            price = price - promocode.discount

        order_data = {
            'buyer': request.user.buyer.id,
            'order_goods': [good.id],
            'promocode': promocode_id,
            'price': round(price, 3)
        } 
        serializer = self.serializer_class(data=order_data)
        serializer.is_valid(raise_exception=True)      
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request):
        orders = Order.objects.all().filter(buyer=request.user.buyer.id)
        serializer = OrderDetailSerializer(orders, many=True)
        # serializer.is_valid(raise_exception=True)
        return paginate(serializer.data, request, 15)
    
class CartToOrderAPIView(APIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        goods = request.data.pop('goods', [])
        promocode_id = request.data.pop('promocode_id', None)
        for good in goods:
            order_goods = []
            price = 0
            carts_id = good.pop('carts_id', [])
            counts = good.pop('counts', [])
            for i in range(0, len(carts_id)):
                cart = Cart.objects.get(id=carts_id[i])
                good_data = {
                    'good': cart.good.id,
                    'price': cart.good.price,
                    'discount': cart.good.discount,
                    'count': counts[i],
                }

                serializer = OrderGoodSerializer(data=good_data)
                serializer.is_valid(raise_exception=True)   
                good = serializer.save()
                order_goods.append(good.id)
                price += (good.price - good.price * (good.discount/100)) * good.count
                cart.delete()
        
            if promocode_id :
                promocode = Promocode.objects.get(id=promocode_id)
                price = price - promocode.discount
            order_data = {
                'buyer': request.user.buyer.id,
                'order_goods': order_goods,
                'promocode': promocode_id,
                'price': round(price, 3)
            }
            serializer = self.serializer_class(data=order_data)
            serializer.is_valid(raise_exception=True)      
            serializer.save()
        return Response(status=status.HTTP_200_OK)