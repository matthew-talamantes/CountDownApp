from django import forms

from .models import Countdown

class CountdownForm(forms.ModelForm):
    dateTime = forms.SplitDateTimeField(widget=forms.SplitDateTimeWidget(date_attrs={'type': 'date'}, time_attrs={'type': 'time'}))
    class Meta:
        model = Countdown
        fields = ['title', 'dateTime', 'description', 'public_link', 'shared_with']