from django.urls import path, include

from .views import APIMyUserRevrieveView

urlpatterns = [
    path('<uuid:uuid>/', APIMyUserRevrieveView.as_view(), name='api_myuser_retrieve'),
    path('', include('userprofile.urls')),
]