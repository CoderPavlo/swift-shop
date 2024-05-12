from rest_framework import serializers

from forecast.models import View

class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = View
        fields= '__all__'

class ChartSerializer(serializers.Serializer):
    chart_image = serializers.ImageField()