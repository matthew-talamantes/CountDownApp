from django.urls import path
from .views import UserProfileDetailView, UserProfileUpdateView, PubicProfileDetailView

urlpatterns = [
    path('profile/', UserProfileDetailView.as_view(), name='profile'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('profile/<uuid:uuid>/', PubicProfileDetailView.as_view(), name='public-profile'),
]