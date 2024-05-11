from django.urls import path

from .views import PublicProfileDetailView, UserProfile

urlpatterns = [
    path('profile/<uuid:uuid>/', UserProfile.as_view(), name='public-profile'),
]