from django.urls import path

from .views import APIMyUserRevrieveView

urlpatterns = [
    path('<uuid:uuid>/', APIMyUserRevrieveView.as_view(), name='api_myuser_retrieve'),
]