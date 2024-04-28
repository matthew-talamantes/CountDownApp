import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from PIL import Image
from django.urls import reverse

# Create your models here.
class MyUser(AbstractUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return self.username
    
class Profile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    profileImage = models.ImageField(verbose_name='Profile Image', upload_to='profileImages/', default='default.jpg', blank=True, null=True)
    friends = models.ManyToManyField(MyUser, related_name='friends', blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'
    
    def get_absolute_url(self):
        return reverse('profile')
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.profileImage.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.profileImage.path)