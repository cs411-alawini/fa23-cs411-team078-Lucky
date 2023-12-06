from django.shortcuts import render, get_object_or_404, redirect
from django.db import connection
from .models import Restaurant, Rating, Users, History, Favorites
# from .forms import RestaurantFilterForm
from rest_framework import viewsets
from .serializers import RestaurantSerializer, RatingSerializer, FavoritesSerializer, HistorySerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

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

def show_data(request):
    users = Users.objects.all()  # Retrieves all users
    # users = Users.objects.raw("SELECT * FROM Users WHERE userName LIKE '7de8a958'")
    history = History.objects.all()  # Retrieves all history records
    favorites = Favorites.objects.all()  # Retrieves all favorites records

    
    context = {
        'users': users,
        'history': history,
        'favorites': favorites,
    }
    
    return render(request, 'shows.html', context)

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.raw('SELECT * FROM Restaurants')
    serializer_class = RestaurantSerializer

class RatingList(APIView):
    def get(self, request, restaurant_name):
        ratings = Rating.objects.raw('SELECT * FROM Rating WHERE restaurantName = %s', [restaurant_name])
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserFavoritesView(APIView):
    def get(self, request, user_name):
        # user = Users.objects.raw('SELECT userID FROM Users WHERE userName = %s', [user_name])
        user = Users.objects.filter(userName=user_name)[0]
        # favorites = Favorites.objects.raw('SELECT * FROM Favorites WHERE userID = %s', [user])
        favorites = Favorites.objects.filter(userID = user)
        serializer = FavoritesSerializer(favorites, many=True)
        return Response(serializer.data)

class UserHistoryView(APIView):
    def get(self, request, user_name):
        user = Users.objects.raw('SELECT userID FROM Users WHERE userName = user_name')
        history = History.objects.raw('SELECT * FROM History WHERE userID = %d', [user])
        serializer = HistorySerializer(history, many=True)
        return Response(serializer.data)

# def add_favorite(request, restaurantName):
#     user_id = request.user.id  # assuming the user is authenticated
#     with connection.cursor() as cursor:
#         cursor.execute("INSERT INTO favorite (user_id, restaurant_id) VALUES (%s, %s)", [user_id, restaurantName])
#     return JsonResponse({'status': 'success'})

# def delete_favorite(request, restaurantName):
#     user_id = request.user.id
#     with connection.cursor() as cursor:
#         cursor.execute("DELETE FROM favorite WHERE user_id = %s AND restaurant_id = %s", [user_id, restaurantName])
#     return JsonResponse({'status': 'success'})

    