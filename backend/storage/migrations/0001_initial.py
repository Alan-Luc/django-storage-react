# Generated by Django 3.1.7 on 2021-02-28 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Storage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=120)),
                ('description', models.CharField(default='', max_length=200)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
    ]