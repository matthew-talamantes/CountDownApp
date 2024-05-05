from django.urls import path

from .views import CountdownCreateView, CountdownDetailView

urlpatterns = [
    path('create/', CountdownCreateView.as_view(), name='countdown-create'),
    path('countdown/<int:pk>/', CountdownDetailView.as_view(), name='countdown-detail'),
]