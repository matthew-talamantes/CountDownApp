from django.contrib import admin

from .models import Countdown

# Register your models here.
class CountdownAdmin(admin.ModelAdmin):
    raw_id_fields = ('created_by', 'updated_by', 'shared_with')

admin.site.register(Countdown, CountdownAdmin)