from django.db import models

from PIL import Image
from django.urls import reverse

from myuser.models import MyUser
from counts.models import Countdown

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    profileImage = models.ImageField(verbose_name='Profile Image', upload_to='profileImages/', default='default.jpg', blank=True, null=True)
    friends = models.ManyToManyField(MyUser, related_name='friends', blank=True)
    favoriteCountdown = models.ForeignKey(Countdown, on_delete=models.SET_NULL, blank=True, null=True)
    followingCountdowns = models.ManyToManyField(Countdown, related_name='followingCountdowns', blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'
    
    def get_absolute_url(self):
        return reverse('profile')
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        try:
            img = Image.open(self.profileImage.path)

            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.profileImage.path)
        except ValueError:
            self.profileImage = 'default.jpg'
            super().save(*args, **kwargs)