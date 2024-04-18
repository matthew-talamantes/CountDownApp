from django.core.validators import validate_email, ValidationError
from django.http import JsonResponse
from dj_rest_auth.registration.views import RegisterView
from allauth.account import signals
from allauth.account.utils import send_email_confirmation

# Create your views here.
class CustomRegistration(RegisterView):
    def get_response_data(self, user):
        data = super().get_response_data(user)
        del data['access']
        del data['refresh']
        return data
    
    def create(self, request, *args, **kwargs):
        try:
            validate_email(request.data['email'])
        except ValidationError as e:
            return JsonResponse({'email': [
                'Enter a valid email address.'
            ]}, status=400)
        response = super().create(request, *args, **kwargs)
        return response
    
    def perform_create(self, serializer):
        user = serializer.save(self.request)
        signals.user_signed_up.send(sender=user.__class__, user=user, request=self.request._request)
        self.access_token, self.refresh_token = ('none', 'none')
        send_email_confirmation(self.request._request, user)
        return user