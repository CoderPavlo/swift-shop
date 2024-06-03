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

class CartGroupedSerializer(serializers.Serializer):
    seller = SellerIdSerializer(read_only=True)
    carts = CartDetailSerializer(many=True)

class OrderGoodDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='good.id')
    name = serializers.CharField(source='good.name')
    image = serializers.ImageField(source='good.image')

    class Meta:
        model = OrderGood
        fields= ['id', 'name', 'image', 'count', 'price', 'discount']

class OrderDetailSerializer(serializers.ModelSerializer):
    order_goods = OrderGoodDetailSerializer(many=True, read_only=True)
    promocode = PromocodeSerializer(read_only=True)
    shop = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields= ['id', 'order_goods', 'promocode', 'date', 'price', 'status', 'shop']

    def get_shop(self, obj):
        if obj.order_goods.exists():
            # Отримуємо перший елемент з ManyToMany поля
            first_order_good = obj.order_goods.first()
            if first_order_good and first_order_good.good.shop:
                shop = first_order_good.good.shop
                return SellerIdSerializer(shop).data
        return None