from datetime import datetime

from pytz import timezone
from rest_framework import serializers

from .models import Countdown

class CountdownSerializer(serializers.ModelSerializer):
    localizedDateTime = serializers.SerializerMethodField()
    class Meta:
        model = Countdown
        fields = ['id', 'title', 'dateTime', 'timeZone', 'localizedDateTime', 'description', 'created_at', 'updated_at', 'created_by', 'updated_by', 'public_link', 'shared_with']
        read_only_fields = ['created_at', 'updated_at', 'created_by', 'updated_by']
    
    def get_localizedDateTime(self, obj):
        objTimezone = timezone(obj.timeZone)
        rawDateTime = datetime(obj.dateTime.year, obj.dateTime.month, obj.dateTime.day, obj.dateTime.hour, obj.dateTime.minute, obj.dateTime.second, obj.dateTime.microsecond)
        localizedDateTime = objTimezone.localize(rawDateTime)
        return localizedDateTime.isoformat()