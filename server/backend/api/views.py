from django.shortcuts import render
from .models import (
    MyUser,
    UserGoals,
    Exercise
)
import jwt
from django.conf import settings
from .serializers import (
    UserSerializer,
    UserGoalsSerializer,
    ExerciseSerializer,
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
        

class ExerciseView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self,request):
        data = request.data
        data.update({"user":request.user.id})
        serializer = ExerciseSerializer(data=data)
        
        if serializer.is_valid():
            exercise = serializer.save()
            exercise.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request):
        queryset = Exercise.objects.filter(user=request.user)
        serializer = ExerciseSerializer(queryset, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def delete(self,request):
        data = request.data

        try:
            exercise = Exercise.objects.get(id=request.data['id'])
            print(request.user.id)
            if exercise.user.id == request.user.id:
                exercise.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self,request):
        data = request.data
        data.update({"user":request.user.id})
        print(data)
        try:
            exercise = Exercise.objects.get(id=request.data['id'])
            print('1')
            if exercise.user.id == request.user.id:
                print('2')
                serializer = ExerciseSerializer(instance=exercise,data=data)
                print('3')
                if serializer.is_valid():
                    print('4')
                    serializer.save()
                    print('5')
                    return Response(serializer.data,status=status.HTTP_200_OK)
                return Response(serializer.errors)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)