from django.shortcuts import render
from django.views.generic import (DetailView, UpdateView)
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from .models import Profile
from .forms import ProfileUpdateForm

# Create your views here.
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
    
class UserProfileUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Profile
    template_name = 'myuser/profile_update.html'
    form_class = ProfileUpdateForm

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

    def test_func(self):
        profile = self.get_object()
        return self.request.user == profile.user  
    
class PubicProfileDetailView(DetailView):
    model = Profile
    template_name = 'myuser/public_profile.html'
    context_object_name = 'profile'
    
    def get_object(self):
        return Profile.objects.get(user__uuid=self.kwargs['uuid'])