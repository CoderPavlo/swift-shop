# Generated by Django 5.0.1 on 2024-04-18 06:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0002_user_is_staff'),
        ('good', '0002_tag_good_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='good',
            name='shop',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='shop', to='auth_api.seller'),
            preserve_default=False,
        ),
    ]
