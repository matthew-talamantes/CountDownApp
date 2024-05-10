from django.contrib import admin

from .models import Profile

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    raw_id_fields = ('user', 'friends')

admin.site.register(Profile, ProfileAdmin)