from django.urls import path
from .views import ServiceCreateView

urlpatterns = [
    path('', ServiceCreateView.as_view(), name='service-list'),
]