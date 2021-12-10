from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Shop
from base.serializers import ShopSerializer
from rest_framework import status
from datetime import datetime

# POST/CREATE Shop (Admin/Seller)
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createShop(request):
    user = request.user

    shop = Shop.objects.create(
        user=user,
        name='',
        description='',
        contact =''
    )
    shop.save()

    serializer = ShopSerializer(instance=shop, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# GET all Shops (Public)
@api_view(['GET'])
def getAllShops(request):
    shops = Shop.objects.all()
    serializer = ShopSerializer(shops, many=True)
    return Response(serializer.data)


# GET shop by Id (Public)
@api_view(['GET'])
def getShop(request, pk):
    shop= Shop.objects.get(shop_id=pk)
    serializer = ShopSerializer(instance=shop, many=False) 
    return Response(serializer.data, status=status.HTTP_200_OK)

# EDIT shop
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateShop(request, pk):
    data = request.data
    shop = Shop.objects.get(shop_id=pk)

    shop.name = data['name']
    shop.description = data['description']
    shop.contact = data['contact']

    shop.save()

    serializer = ShopSerializer(shop, many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)


# DELETE Shop (Admin/Seller)
@api_view(['DELETE'])
# @permission_classes([IsAdminUser])
def deleteShop(request, pk):
    shop = Shop.objects.get(shop_id=pk)
    shop.delete()
    return Response('Shop Deleted', status=status.HTTP_204_NO_CONTENT)