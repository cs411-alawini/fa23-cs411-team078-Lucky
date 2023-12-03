// RestaurantListPage.js
import React, { useState } from 'react';
import './RestaurantListPage.css'; // Make sure to create a corresponding CSS file

function RestaurantListPage() {
    const dummyRestaurants = [
        {
          id: 1,
          name: 'The Gourmet Hut',
          rating: '4.5',
          style: 'Italian',
          price: '$$$',
          address: '123 Foodie Lane, Taste Town'
        },
        {
          id: 2,
          name: 'Burger Bonanza',
          rating: '4.2',
          style: 'Fast Food',
          price: '$',
          address: '456 Snack Street, Munch City'
        },
        {
          id: 3,
          name: 'Sushi Central',
          rating: '4.8',
          style: 'Japanese',
          price: '$$$',
          address: '789 Sashimi Blvd, Oceanview'
        },
        // ... more restaurants
      ];

    const [restaurants, setRestaurants] = useState(dummyRestaurants); // This should be your actual restaurant data
    const [searchTerm, setSearchTerm] = useState('');


    // Handle search functionality
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        // Filter restaurant list based on search term
    };

    // Rendered list based on search term
    const filteredRestaurants = searchTerm
        ? restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : restaurants;

    return (
        <div className="restaurant-list-page">
            <h1>Welcome, Dawn</h1>
            {/* Tabs and Search Bar */}
            <div className="top-bar">
                <div className="tabs">
                <button>Recommend</button>
                <button>History</button>
                <button>Favorite</button>
                </div>
                <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                />
            </div>
            {/* Restaurant List */}
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant-item">
                    <div className="restaurant-details">
                        <span className="restaurant-name">{restaurant.name}</span>
                        <div className="restaurant-meta">
                        <span className="restaurant-rating">Rating: {restaurant.rating}</span>
                        <span className="restaurant-style">Style: {restaurant.style}</span>
                        <span className="restaurant-price">Price: {restaurant.price}</span>
                        </div>
                    </div>
                    <span className="restaurant-address">{restaurant.address}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RestaurantListPage;
