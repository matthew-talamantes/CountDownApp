from rest_framework import serializers

from myuser.serializers import MyUserSerializer
from counts.serializers import CountdownSerializer

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    friends = MyUserSerializer(many=True)
    favoriteCountdown = CountdownSerializer()
    followingCountdowns = CountdownSerializer(many=True)

    class Meta:
        model = Profile
        fields = ('user', 'profileImage', 'friends', 'favoriteCountdown', 'followingCountdowns')