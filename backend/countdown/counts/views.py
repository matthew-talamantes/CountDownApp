from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import (TemplateView, CreateView, UpdateView, DeleteView, DetailView, ListView)

from .models import Countdown, get_anonymous_user_instance
from .forms import CountdownForm

# Create your views here.
class HomeView(TemplateView):
    template_name = 'counts/home.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Home'
        return context
    
class CountdownCreateView(CreateView):
    model = Countdown
    template_name = 'counts/countdown_form.html'
    form_class = CountdownForm
    
    def form_valid(self, form):
        user = self.request.user
        if user.is_anonymous:
            user = get_anonymous_user_instance()
        form.instance.created_by = user
        if form.cleaned_data['title'] == 'bannanas':
            form.add_error('title', 'You cannot use that title.')
            return self.form_invalid(form)

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
    
    def test_func(self):
        countdown = self.get_object()
        return self.request.user == countdown.created_by or countdown.is_public or self.request.user in countdown.shared_with.all()