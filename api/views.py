from django.shortcuts import render
from rest_framework import generics  # creates a class that inherits from generic view class
from .serializers import RoomSerializer
from .models import Room

# Create your views here.

# api view
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer  # convert complex data types to json etc