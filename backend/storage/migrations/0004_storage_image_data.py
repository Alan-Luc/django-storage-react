# Generated by Django 3.1.7 on 2021-03-05 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0003_auto_20210301_2222'),
    ]

    operations = [
        migrations.AddField(
            model_name='storage',
            name='image_data',
            field=models.BinaryField(null=True),
        ),
    ]
