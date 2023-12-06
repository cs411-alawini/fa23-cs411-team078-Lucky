from django.shortcuts import render, get_object_or_404, redirect
from django.db import connection
from .models import Restaurant, Rating
from .forms import RestaurantFilterForm
from rest_framework import viewsets
from .serializers import RestaurantSerializer

def restaurant_list(request):
    # form = RestaurantFilterForm(request.GET)
    
    
    # if form.is_valid():
    #     style = form.cleaned_data.get('style')
    #     price = form.cleaned_data.get('price')
    #     zip = form.cleaned_data.get('zip')

    #     restaurants = Restaurant.objects.all()
    #     if style:
    #         restaurants = restaurants.filter(style=style)
    #     if price:
    #         restaurants = restaurants.filter(price=price)
    #     if zip:
    #         restaurants = restaurants.filter(zip=zip)
    
    # else:
    # restaurants = Restaurant.objects.all()
    restaurants = Restaurant.objects.raw('SELECT * FROM Restaurants')
            
    # return render(request, 'restaurant_list.html', {'restaurants': restaurants})
    return render(request, 'restaurant_list.html', {'restaurants': restaurants})

def restaurant_detail(request, restaurant_name):
    # restaurant = get_object_or_404(Restaurant, restaurantName=restaurant_name)
    target_restaurant = Restaurant.objects.raw('SELECT * FROM Restaurants WHERE restaurantName = %s', [restaurant_name])[0]
    return render(request, 'restaurant_detail.html', {'restaurant': target_restaurant})

def restaurant_ratings(request, restaurant_name):
    # restaurant = get_object_or_404(Restaurant, restaurantName=restaurant_name)
    restaurant = Restaurant.objects.raw('SELECT * FROM Restaurants WHERE restaurantName = %s', [restaurant_name])[0]
    ratings = Rating.objects.raw('SELECT * FROM Rating WHERE restaurantName = %s', [restaurant_name])
    return render(request, 'restaurant_ratings.html', {
        'restaurant': restaurant,
        'ratings': ratings
    })


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.raw('SELECT * FROM Restaurants')
    serializer_class = RestaurantSerializer
    