from django.contrib import admin
from .models import Storage

class StorageAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')

# Register your models here.

admin.site.register(Storage, StorageAdmin)