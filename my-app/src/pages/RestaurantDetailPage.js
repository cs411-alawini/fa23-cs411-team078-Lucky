import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./RestaurantDetailPage.css";

// pass in list of restaurants
function RestaurantDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // const { id } = useParams();
  const { state: restaurant } = useLocation();

  const handleBack = () => {
    // Navigate back to the restaurant list page
    navigate(-1);
  };

  function toggleFavorite() {
    setIsFavorite((isFavorite) => !isFavorite);
    console.log(`isFacorite: ${isFavorite}`);
  }

  return (
    <div className="restaurantDetailPage">
      <div className="container">
        <div className="pageTitle">
          <h1>{restaurant.restaurantName}</h1>
          <button
            className={`favoriteButton${isFavorite ? " isFavorite" : ""}`}
            onClick={toggleFavorite}
          >
            <img src="./../../star.jpg" alt="star" />
          </button>
        </div>
        <div className="restaurantDetails">
          {/* <div>
            <label>Rating:</label>
            <span>{restaurant.rating}</span>
          </div> */}
          <div>
            <label>Style:</label>
            <span>{restaurant.style}</span>
          </div>
          <div>
            <label>Price:</label>
            {/* replace restaurant.price with price */}
            <span>{restaurant.price}</span>
          </div>
          <div>
            <label>Address:</label>
            <span>{restaurant.address}</span>
          </div>
        </div>
        {/* <div className="restaurantComments">
          {restaurant.comments.map((comment) => {
            return <p key={comment}>{comment}</p>;
          })}
        </div> */}
        <button className="backButton" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
