from django.urls import path

from .views import CountdownCreateView

urlpatterns = [
    path('create/', CountdownCreateView.as_view(), name='countdown-create'),
]