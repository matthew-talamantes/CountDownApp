from django import forms
from allauth.account.forms import LoginForm

class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['login'].widget = forms.TextInput(attrs={'class': 'grow', 'placeholder': 'Username or Email'})
        self.fields['password'].widget = forms.PasswordInput(attrs={'class': 'grow', 'placeholder': 'Password'})