from django.urls import path
from accounts import views

urlpatterns = [
    path('register/', views.UserCreate.as_view(), name='user-register'),
    path('login/', views.SignInSendOtp.as_view(), name='user-login'),
    path('verify-otp/', views.VerifyOtp.as_view(), name='verify-otp'),
    path('verify-signin/', views.VerifySignInOtp.as_view(), name='verify-signin'),
    path('admin/send-otp/', views.SendOtpView.as_view(), name='send-otp'),
    path('admin/verify-otp/', views.VerifyOtpView.as_view(), name='admin-verify-otp'),
]