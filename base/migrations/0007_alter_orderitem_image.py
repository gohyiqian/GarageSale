# Generated by Django 3.2.9 on 2021-12-04 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_shippingaddress_shippingprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='image',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
