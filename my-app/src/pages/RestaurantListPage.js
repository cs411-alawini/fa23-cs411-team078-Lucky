// RestaurantListPage.js
import React, { useState, useEffect } from "react";
import "./RestaurantListPage.css"; // Make sure to create a corresponding CSS file
import { useNavigate } from "react-router-dom";
import RestaurantItem from "../Components/RestaurantItem";
import axios from "axios";

function RestaurantListPage() {
  // 这里做对接
  const dummyRestaurants = [
    {
      id: 1,
      name: "The Gourmet Hut",
      rating: "4.5",
      style: "Italian",
      price: "$$$",
      address: "123 Foodie Lane, Taste Town",
      comments: ["The", "Gourmet", "Hut"],
    },
    {
      id: 2,
      name: "Burger Bonanza",
      rating: "4.2",
      style: "Fast Food",
      price: "$",
      address: "456 Snack Street, Munch City",
      comments: ["Burger", "Bonanza"],
    },
    {
      id: 3,
      name: "Sushi Central",
      rating: "4.8",
      style: "Japanese",
      price: "$$$",
      address: "789 Sashimi Blvd, Oceanview",
      comments: ["Sushi", "Central"],
    },
    // ... more restaurants
  ];

  const [recommends, setRecommends] = useState([]); // This should be your actual restaurant data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTag, setCurrentTag] = useState("recommend");

  useEffect(() => {
    // Fetch restaurants from the Django backend
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/Restaurant/');
        setRecommends(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchRestaurants();
  }, []);

  // 这俩做对接
  const [histories, setHistories] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Filter restaurant list based on search term
  };

  function filterRestaurants(restaurants) {
    return restaurants.filter(
      (restaurant) =>
        restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const restaurants =
    currentTag === "recommend"
      ? filterRestaurants(recommends)
      : currentTag === "history"
      ? filterRestaurants(histories)
      : currentTag === "favorite"
      ? filterRestaurants(favorites)
      : dummyRestaurants;
  // Rendered list based on search term

  return (
    <div className="restaurant-list-page">
      <h1>Welcome, Dawn</h1>
      {/* Tabs and Search Bar */}
      <div className="top-bar">
        <div className="tabs">
          <button
            className={currentTag === "recommend" ? "active" : ""}
            onClick={() => setCurrentTag("recommend")}
          >
            Recommend
          </button>
          <button
            className={currentTag === "history" ? "active" : ""}
            onClick={() => setCurrentTag("history")}
          >
            History
          </button>
          <button
            className={currentTag === "favorite" ? "active" : ""}
            onClick={() => setCurrentTag("favorite")}
          >
            Favorite
          </button>
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
        {currentTag === "recommend" &&
          filterRestaurants(restaurants).map((restaurant) => (
            <RestaurantItem restaurant={restaurant} key={restaurant.restaurantName} />
          ))}
      </div>
    </div>
  );
}

export default RestaurantListPage;
