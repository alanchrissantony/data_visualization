# models.py
from django.db import models

class Service(models.Model):
    job_number = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='Waiting')
    vehicle_type = models.CharField(max_length=50)
    vehicle_number = models.CharField(max_length=50)
    user_email = models.EmailField()
    service_description = models.TextField()
    token_number = models.CharField(max_length=255, unique=True)
    vehicle_image = models.ImageField(upload_to='vehicles/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.job_number}"