from rest_framework import serializers

from myuser.serializers import MyUserSerializer

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    friends = MyUserSerializer(many=True)
    class Meta:
        model = Profile
        fields = ('user', 'profileImage', 'friends')