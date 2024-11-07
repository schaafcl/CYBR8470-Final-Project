# Generated by Django 3.2.25 on 2024-11-07 21:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Protein',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('servings', models.PositiveIntegerField()),
                ('prep_time', models.PositiveIntegerField(null=True)),
                ('cook_time', models.PositiveIntegerField(null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='recipes/')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='foodapp.category')),
                ('protein', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='foodapp.protein')),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(null=True)),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=8)),
                ('measurement_unit', models.CharField(max_length=50)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='foodapp.recipe')),
            ],
        ),
    ]
