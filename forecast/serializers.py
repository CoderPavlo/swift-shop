from rest_framework import serializers

from forecast.models import View

class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = View
        fields= '__all__'
        extra_kwargs = {
            'buyer': {'required': False}
        }