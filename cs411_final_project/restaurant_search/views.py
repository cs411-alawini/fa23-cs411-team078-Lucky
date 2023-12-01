from django.shortcuts import render, get_object_or_404, redirect
from .models import Restaurant, Rating
from .forms import RestaurantFilterForm

def restaurant_list(request):
    form = RestaurantFilterForm(request.GET)
    
    
    if form.is_valid():
        style = form.cleaned_data.get('style')
        price = form.cleaned_data.get('price')
        zip = form.cleaned_data.get('zip')

        restaurants = Restaurant.objects.all()
        if style:
            restaurants = restaurants.filter(style=style)
        if price:
            restaurants = restaurants.filter(price=price)
        if zip:
            restaurants = restaurants.filter(zip=zip)
    
    else:
        restaurants = Restaurant.objects.all()
            
    # return render(request, 'restaurant_list.html', {'restaurants': restaurants})
    return render(request, 'restaurant_list.html', {'restaurants': restaurants, 'form': form})

def restaurant_detail(request, restaurant_name):
    restaurant = get_object_or_404(Restaurant, restaurantName=restaurant_name)
    return render(request, 'restaurant_detail.html', {'restaurant': restaurant})

def restaurant_ratings(request, restaurant_name):
    restaurant = get_object_or_404(Restaurant, restaurantName=restaurant_name)
    ratings = Rating.objects.filter(restaurantName=restaurant)
    return render(request, 'restaurant_ratings.html', {
        'restaurant': restaurant,
        'ratings': ratings
    })
    