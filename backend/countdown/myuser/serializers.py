from django.conf import settings
from django.core.validators import validate_email, ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, exceptions
from dj_rest_auth.serializers import LoginSerializer

from .models import MyUser

class CustomLoginSerializer(LoginSerializer):
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        try:
            validate_email(username)
            email = username
        except ValidationError:
            email = None
        
        user = self.get_auth_user(username, email, password)

        if not user:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        # Did we get back an active user?
        self.validate_auth_user_status(user)

        # If required, is the email verified?
        if 'dj_rest_auth.registration' in settings.INSTALLED_APPS:
            self.validate_email_verification_status(user, email=email)

        attrs['user'] = user
        return attrs
    
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('uuid', 'username')
        read_only_fields = ('uuid', 'username')
