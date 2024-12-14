from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from .serializers import UserSerializer
from django.core.cache import cache
import random
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from accounts.serializers import UserSerializer,VerifyOtpSerializer, SendOtpSerializer
from accounts.models import User
from data_visualization import settings

# A simple in-memory store for OTPs (for demonstration purposes)
otp_store = {}
otp_storage = {}

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')

        if not username or not email:
            return Response({"error": "Username and email are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "This username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "This email is already taken."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random OTP
        otp = random.randint(100000, 999999)
        data = {
            'email': email,
            'username': username,
            'otp': otp
        }
        cache.set(email, data, timeout=300)  # Store OTP in memory (use a more persistent store in production)

        # Send OTP via email
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp}.',
            'google.com',  # Replace with your sender email
            [email],
            fail_silently=False,
        )
        print(otp)

        return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)

class VerifyOtp(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({"error": "Email and OTP are required."}, status=status.HTTP_400_BAD_REQUEST)

        stored_otp = cache.get(email)

        if not stored_otp or stored_otp['otp'] != int(otp):
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with user registration after OTP verification
        user_data = {
            'username': stored_otp['username'],
            'email': stored_otp['email'],
        }

        serializer = UserSerializer(data=user_data)

        if serializer.is_valid():
            serializer.save()  # Save the user
            request.session['user']=email
            cache.delete(email)  # Remove OTP from the cache after successful verification
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class SignInSendOtp(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        username = request.data.get('username')

        if not username or not email:
            return Response({"error": "Username and email are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            User.objects.get(email=email, username=username)
        except User.DoesNotExist:
            return Response({"error": "User with this email and username does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Generate a random OTP
        otp = random.randint(100000, 999999)
        data = {
            'email': email,
            'username': username,
            'otp': otp
        }
        cache.set(email, data, timeout=300)  # Store OTP in cache for 5 minutes

        # Send OTP via email
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp}.',
            'google.com',  # Replace with your sender email
            [email],
            fail_silently=False,
        )
        print(otp)
        
        return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)


class VerifySignInOtp(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')
        
        if not email or not otp:
            return Response({"error": "Email and OTP are required."}, status=status.HTTP_400_BAD_REQUEST)

        stored_otp = cache.get(email)
        
        if not stored_otp or stored_otp['otp'] != int(otp):
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        # Authentication successful
        cache.delete(email)  # Remove OTP from cache
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class SendOtpView(APIView):
    def post(self, request):

        serializer = SendOtpSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']

            try:
                User.objects.get(email=email, username=username, is_admin=True)
            except User.DoesNotExist:
                return Response({"error": "User with this email and username does not exist."}, status=status.HTTP_404_NOT_FOUND)
            
            # Generate a random OTP
            otp = str(random.randint(100000, 999999))
            otp_storage[email] = otp  # Store OTP in memory (use a more persistent method in production)

            # Send OTP via email
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp}.',
                'google.com',
                [email],
                fail_silently=False,
            )
            print(otp)
            return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOtpView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']

            try:
                user = User.objects.get(email=email, is_admin=True)
            except User.DoesNotExist:
                return Response({"error": "User with this email and username does not exist."}, status=status.HTTP_404_NOT_FOUND)

            serializer = UserSerializer(user)
            # Verify the OTP
            if email in otp_storage and otp_storage[email] == otp:
                del otp_storage[email]  # Remove OTP after verification
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)