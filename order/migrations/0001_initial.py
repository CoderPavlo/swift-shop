# Generated by Django 5.0.1 on 2024-05-01 15:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth_api', '0003_seller_date_registered'),
        ('good', '0007_good_date_created'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderGood',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField()),
                ('good', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='good', to='good.good')),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to='auth_api.buyer')),
                ('order_good', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_good', to='order.ordergood')),
            ],
        ),
        migrations.CreateModel(
            name='Promocode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=255)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('percent', models.IntegerField()),
                ('goods', models.ManyToManyField(to='good.good')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seller', to='auth_api.seller')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('price', models.FloatField()),
                ('status', models.IntegerField(choices=[(0, 'PROCESSING'), (1, 'PAID'), (2, 'SENT'), (3, 'DELIVERED')], default=0)),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_buyer', to='auth_api.buyer')),
                ('order_goods', models.ManyToManyField(to='order.ordergood')),
                ('promocode', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_promocode', to='order.promocode')),
            ],
        ),
        migrations.CreateModel(
            name='UserPromocode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_buyer', to='auth_api.buyer')),
                ('promocode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_promocode', to='order.promocode')),
            ],
        ),
    ]