from django.urls import path

from .views import APICountdownReadUpdateDeleteView, APICountdownCreateView

urlpatterns = [
    path('create/', APICountdownCreateView.as_view(), name='countdown-create'),
    path('countdown/<int:pk>/', APICountdownReadUpdateDeleteView.as_view(), name='countdown-detail'),
]