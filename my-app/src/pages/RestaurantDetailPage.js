import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from './UserContext';

import "./RestaurantDetailPage.css";

// pass in list of restaurants
function RestaurantDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const username = user?.username || localStorage.getItem('username'); // Fallback to local storage
  console.log(username);

  // const { id } = useParams();
  const { state: restaurant } = useLocation();

  const handleBack = () => {
    // Navigate back to the restaurant list page
    navigate(-1);
  };

  function toggleFavorite() {
    // setIsFavorite((isFavorite) => !isFavorite);
    console.log(`isFacorite: ${isFavorite}`);
    console.log(restaurant.restaurantName);

    setIsFavorite(prevIsFavorite => {
      const newIsFavorite = !prevIsFavorite;
  
      // Send POST request to Django backend
      axios.post(`http://localhost:8000/api/update/${username}/`, {
        restaurantName: restaurant.restaurantName,
        isFavorite: newIsFavorite
      })
      .then(response => {
        console.log(restaurant.restaurantName);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating favorite: ', error);
      });
  
      return newIsFavorite;
    });
  }

  const [ratings, setRatings] = useState([]);
  const [allrate, setAllRate] = useState([]);
  const encodedRestaurantName = encodeURIComponent(restaurant.restaurantName);
  useEffect(() => {
    // Fetch restaurants from the Django backend
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ratings/${encodedRestaurantName}/`);
        setRatings(response.data[0].score);
        setAllRate(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchRatings();
  }, [encodedRestaurantName]);

  // useEffect(() => {
  // // Define a function to fetch ratings and favorite status
  // const fetchData = async () => {
  //   try {
  //     // Fetch ratings
  //     const ratingsResponse = await axios.get(`http://localhost:8000/api/ratings/${encodedRestaurantName}/`);
  //     setRatings(ratingsResponse.data[0].score);
  //     setAllRate(ratingsResponse.data);

  //     // Fetch favorite status
  //     const favoriteResponse = await axios.get(`http://localhost:8000/api/user/favorites/${username}/${encodedRestaurantName}/`);
  //     setIsFavorite(favoriteResponse.data.isFavorite); // Adjust this line based on how your backend sends the favorite status
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };

  // Call the function
//   fetchData();
// }, [username, encodedRestaurantName]);


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
          <div>
            <label>Rating:</label>
            <span>{ratings}</span>
          </div>
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
        <div className="restaurantComments">
          {allrate.map((rating) => (
            <div key={rating.ratingID}>
              <p><strong>Comment:</strong> {rating.comment}</p>
            </div>
          ))}
        </div>
        <button className="backButton" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;

