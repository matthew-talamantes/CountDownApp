from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import (TemplateView, CreateView, UpdateView, DeleteView, DetailView, ListView)
from django.utils import timezone as djTimezone

from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from pytz import timezone
import pytz

from datetime import datetime

from .models import Countdown, get_anonymous_user_instance
from .forms import CountdownForm
from .permissions import CountdownPermissions
from .serializers import CountdownSerializer

# Create your views here.
class HomeView(TemplateView):
    template_name = 'counts/home.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Home'
        return context
    
class APICountdownCreateView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = CountdownSerializer
    queryset = Countdown.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_anonymous:
            user = get_anonymous_user_instance()
            serializer.save(created_by=user, public_link=True, shared_with=[])
        else:
            serializer.save(created_by=user)

class APICountdownReadUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    permission_classes = [CountdownPermissions]
    serializer_class = CountdownSerializer
    queryset = Countdown.objects.all()

    def perform_update(self, serializer):
        user = self.request.user
        serializer.save(updated_by=user, updated_at=djTimezone.now())

class APICountdownListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CountdownSerializer
    
    def get_queryset(self):
        user = self.request.user
        options = self.request.query_params
        sharedWith = options.get('sharedWith', None)
        if sharedWith.lower() == 'true':
            results = user.shared_countdowns.all()
        else:
            results = Countdown.objects.filter(created_by=user)
        return results
        
class CountdownCreateView(CreateView):
    model = Countdown
    template_name = 'counts/countdown_form.html'
    form_class = CountdownForm
    
    def form_valid(self, form):
        user = self.request.user
        if user.is_anonymous:
            user = get_anonymous_user_instance()
        form.instance.created_by = user
        if form.instance.title == 'bananas':
            form.add_error('title', 'You cannot use the word "bananas" in the title.')
            return super().form_invalid(form)
        return super().form_valid(form)
    
    def form_invalid(self, form):
        for field in form.errors:
            classes = form[field].field.widget.attrs.get('class', '')
            if classes == '':
                form[field].field.widget.attrs['class'] = 'error'
            else:
                form[field].field.widget.attrs['class'] += ' error'
        return super().form_invalid(form)
    
class CountdownDetailView(UserPassesTestMixin, DetailView):
    model = Countdown
    template_name = 'counts/countdown_detail.html'
    context_object_name = 'countdown'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        countdown = context['countdown']
        countTimezone = timezone(countdown.timeZone)
        rawDateTime = datetime(countdown.dateTime.year, countdown.dateTime.month, countdown.dateTime.day, countdown.dateTime.hour, countdown.dateTime.minute, countdown.dateTime.second, countdown.dateTime.microsecond)
        localizedDateTime = countTimezone.localize(rawDateTime)
        context['localizedDateTime'] = localizedDateTime.isoformat()
        return context
    
    def test_func(self):
        countdown = self.get_object()
        return self.request.user == countdown.created_by or countdown.is_public or self.request.user in countdown.shared_with.all()