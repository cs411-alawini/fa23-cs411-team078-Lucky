import { useNavigate } from "react-router-dom";

function RestaurantItem({ restaurant, onClick: setHistories }) {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-item"
      onClick={() =>
        navigate(`/restaurants/${restaurant.id}`, { state: restaurant })
      }
    >
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
  );
}

export default RestaurantItem;
