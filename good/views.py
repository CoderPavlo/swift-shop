from rest_framework.views import APIView
from auth_api.authentication import JWTAuthentication
from good.models import Tag
from good.serializers import GoodSerializer, TagSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

class GoodAPIView(APIView):
    serializer_class = GoodSerializer
    permission_classes = (AllowAny, )
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
    permission_classes = (AllowAny, )

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

