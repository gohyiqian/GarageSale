from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password


# jwt Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # validate method
    def validate(self, attrs):
        data = super().validate(attrs)

        # loop through all the serializer fields and return
        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# User Register
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['username'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        # return the token upon registration
        serializer = UserSerializerWithToken(instance=user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        message = {'detail': 'Username or email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# Admin GET all users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(instance=users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Admin GET userById
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, many=False)
    return Response(serializer.data)

# User can EDIT/UPDATE themselves
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data

    user.first_name = data['username']
    user.username = data['username']
    user.email = data['email']
    user.is_staff = data['isAdmin'] #check for is_staff = true
    user.save()

    serializer = UserSerializer(instance=user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Admin DELETE userById
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted', status=status.HTTP_204_NO_CONTENT)

# User GET profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(instance=user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

# User EDIT profile
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(instance=user, many=False)

    data = request.data
    user.first_name = data['username']
    user.username = data['username']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
