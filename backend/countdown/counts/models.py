from django.db import models
from django.utils import timezone

from myuser.models import MyUser

# Create your models here.

def get_deleted_user_instance():
    return MyUser.objects.get_or_create(username='deleted')[0]

class Countdown(models.Model):
    title = models.CharField(max_length=100, default='Countdown', blank=True)
    dateTime = models.DateTimeField()
    description = models.TextField(default='', blank=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    created_by = models.ForeignKey(MyUser, on_delete=models.SET(get_deleted_user_instance), related_name='countdowns')
    updated_by = models.ForeignKey(MyUser, on_delete=models.SET(get_deleted_user_instance), related_name='updated_countdowns', blank=True, null=True)
    public_link = models.BooleanField(default=False)
    shared_with = models.ManyToManyField(MyUser, related_name='shared_countdowns', blank=True)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return f'/countdown/{self.pk}/'
