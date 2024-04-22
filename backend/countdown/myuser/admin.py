from django.contrib import admin

from .models import MyUser, Profile

class ProfileAdmin(admin.ModelAdmin):
    raw_id_fields = ('user', 'friends')

# Register your models here.
admin.site.register(MyUser)
admin.site.register(Profile, ProfileAdmin)