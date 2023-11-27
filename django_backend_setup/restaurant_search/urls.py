from django.urls import path
from . import views

urlpatterns = [
    # Add other URLs as needed
    path('restaurants/', views.restaurant_list, name='restaurant_list'),
    # path('', include('django.contrib.auth.urls')),
    path('restaurants/<str:restaurant_name>/', views.restaurant_detail, name='restaurant_detail'),
    path('restaurant/<str:restaurant_name>/ratings/', views.restaurant_ratings, name='restaurant_ratings'),
]