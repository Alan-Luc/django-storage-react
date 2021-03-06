from django.db import models

# Create your models here.
class Storage(models.Model):
    name = models.CharField(max_length=120, blank=False, default='')
    image = models.FileField(blank=True, null=True)

    