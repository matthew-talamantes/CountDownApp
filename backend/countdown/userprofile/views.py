from django.shortcuts import render
from django.views.generic import (DetailView, UpdateView)
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny

from .models import Profile
from .serializers import PublicProfileSerializer, ProfileSerializer
from .permissions import ProfilePermissions
# from .forms import ProfileUpdateForm

# Create your views here.
class PublicProfileDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = PublicProfileSerializer
    lookup_field = 'user__uuid'
    lookup_url_kwarg = 'uuid'
    queryset = Profile.objects.all()

class UserProfile(RetrieveUpdateAPIView):
    permission_classes = [ProfilePermissions]
    lookup_field = 'user__uuid'
    lookup_url_kwarg = 'uuid'
    queryset = Profile.objects.all()
    
    def get_serializer_class(self):
        if self.request.user == self.get_object().user:
            return ProfileSerializer
        return PublicProfileSerializer

class UserProfileDetailView(LoginRequiredMixin, DetailView):
    model = Profile
    template_name = 'myuser/profile.html'
    context_object_name = 'profile'
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = self.request.user
        return context
    
# class UserProfileUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
#     model = Profile
#     template_name = 'myuser/profile_update.html'
#     form_class = ProfileUpdateForm

#     def get_object(self):
#         return Profile.objects.get(user=self.request.user)

#     def test_func(self):
#         profile = self.get_object()
#         return self.request.user == profile.user  
    
class PubicProfileDetailView(DetailView):
    model = Profile
    template_name = 'myuser/public_profile.html'
    context_object_name = 'profile'
    
    def get_object(self):
        return Profile.objects.get(user__uuid=self.kwargs['uuid'])