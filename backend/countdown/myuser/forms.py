from django import forms
from allauth.account.forms import LoginForm, SignupForm

class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['login'].widget = forms.TextInput(attrs={'class': 'grow', 'placeholder': 'Username or Email'})
        self.fields['password'].widget = forms.PasswordInput(attrs={'class': 'grow', 'placeholder': 'Password'})

class CustomSignupForm(SignupForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget = forms.TextInput(attrs={'class': 'grow', 'placeholder': 'Username'})
        self.fields['email'].widget = forms.EmailInput(attrs={'class': 'grow', 'placeholder': 'Email'})
        self.fields['password1'].widget = forms.PasswordInput(attrs={'class': 'grow', 'placeholder': 'Password'})
        self.fields['password2'].widget = forms.PasswordInput(attrs={'class': 'grow', 'placeholder': 'Confirm Password'})
    