from rest_framework import serializers

from auth_api.serializers import SellerIdSerializer
from good.serializers import GoodCardDataSerializer
from order.models import Cart, Order, OrderGood, Promocode

class OrderGoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderGood
        fields= '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields= '__all__'

class CartDetailSerializer(serializers.ModelSerializer):
    good = GoodCardDataSerializer()
    class Meta:
        model = Cart
        fields= ['id', 'good', 'count']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields= '__all__'
        extra_kwargs = {
            'promocode': {'required': False}
        }

class PromocodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocode
        fields= ['code', 'start_date', 'end_date', 'discount']

class OrderDetailSerializer(serializers.ModelSerializer):
    order_goods = OrderGoodSerializer(many=True, read_only=True)
    promocode = PromocodeSerializer(read_only=True)
    class Meta:
        model = Order
        fields= '__all__'

class CartGroupedSerializer(serializers.Serializer):
    seller = SellerIdSerializer(read_only=True)
    carts = CartDetailSerializer(many=True)