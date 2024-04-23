# Generated by Django 5.0.1 on 2024-04-17 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('good', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='good',
            name='tags',
            field=models.ManyToManyField(to='good.tag'),
        ),
    ]
