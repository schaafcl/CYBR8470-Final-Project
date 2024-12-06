# Generated by Django 3.2.25 on 2024-12-05 18:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0004_alter_ingredient_recipe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='measurement_unit',
            field=models.CharField(default='None', max_length=50),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='quantity',
            field=models.DecimalField(decimal_places=2, default='0', max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ingredient_list', to='foodapp.recipe'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='servings',
            field=models.PositiveIntegerField(null=True),
        ),
    ]