from django.db import models
from django.contrib.auth.models import User

class Restaurant(models.Model):
    restaurantName = models.CharField(max_length=255, primary_key=True)
    style = models.CharField(max_length=255, null=False)
    price = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    zip = models.CharField(max_length=255, null=False)

class Rating(models.Model):
    ratingID = models.AutoField(primary_key=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    score = models.IntegerField(null=False)
    comment = models.TextField(null=False)