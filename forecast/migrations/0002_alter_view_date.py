# Generated by Django 5.0.1 on 2024-05-13 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forecast', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='view',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
