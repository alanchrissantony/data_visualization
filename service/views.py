# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Service
from .serializers import ServiceSerializer

class ServiceCreateView(generics.CreateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        email = request.user.email  # Get the email from the authenticated user
        services = Service.objects.filter(user_email=email)
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        email = request.user.email  # Get the email from the authenticated user
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_email=email)  # Save the service with the user's email
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

class ServiceAdminView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        if 'admin' in request.session:
            services = Service.objects.all()
            serializer = ServiceSerializer(services, many=True)
            return Response(serializer.data)
        else:
            return Response({'detail': 'User not authenticated'}, status=401)

