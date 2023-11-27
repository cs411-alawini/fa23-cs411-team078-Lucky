from django.shortcuts import render, get_object_or_404
# from .forms import UserRegisterForm
from .models import Restaurant, Rating

def restaurant_list(request):
    restaurants = Restaurant.objects.all()
    return render(request, 'restaurant_list.html', {'restaurants': restaurants})

def restaurant_detail(request, restaurant_name):
    restaurant = get_object_or_404(Restaurant, restaurantName=restaurant_name)
    return render(request, 'restaurant_detail.html', {'restaurant': restaurant})

def restaurant_ratings(request, restaurant_name):
    restaurant = get_object_or_404(Restaurant, restaurantName=restaurant_name)
    ratings = Rating.objects.filter(restaurant=restaurant)
    return render(request, 'restaurant_ratings.html', {
        'restaurant': restaurant,
        'ratings': ratings
    })