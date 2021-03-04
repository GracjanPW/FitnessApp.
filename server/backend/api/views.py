from django.shortcuts import render
from .models import (
    MyUser,
    UserGoals
)
import jwt
from django.conf import settings
from .serializers import (
    UserSerializer,
    UserGoalsSerializer
)
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class UserCreateView(APIView):
    permission_classes  = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserGoalsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self,request):
        try:
            goals = UserGoals.objects.get(user=request.user)
        except UserGoals.DoesNotExist:
            goals = UserGoals.objects.create(user=request.user)
        serializer = UserGoalsSerializer(goals)
        return Response(serializer.data)
    
    def put(self,request):
        data = request.data
        serializer = UserGoalsSerializer(
            instance=UserGoals.objects.get(user=request.user),
            data={'goals':[data]}
        )
        if serializer.is_valid():
            goal = serializer.save()
            return Response(None if 'id' in data.keys() else goal, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)