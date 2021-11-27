from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Product, Review
from base.serializers import ProductSerializer
from rest_framework import status

# GET all products with Pagination
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(instance=products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


# GET 1 Product for ProductShowPage
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(instance=product, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

# GET top few products for Homepage
@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(instance=products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Admin POST Product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        stockCount=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(isntance=product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# Admin POST Product Image
@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded', status=status.HTTP_201_CREATED)


# Admin EDIT product
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.stockCount = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)


# Admin DELETE Product
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Producted Deleted', status=status.HTTP_204_NO_CONTENT)