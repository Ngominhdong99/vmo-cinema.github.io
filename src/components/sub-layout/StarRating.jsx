import React, { useState } from "react";
import "../../scss/sub-layout/StarRating.scss";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCurrentUser, setStar } from "../../services/store/action";

function StarRating({ params }) {
  const [currentUserRating, setCurrentUserRating] = React.useState([]);
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const fetchStar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/rate?movieId=${params.id}&userId=${
          JSON.parse(localStorage.getItem("user")).id
        }`
      );
      const data = await response.json();
      setCurrentUserRating(data);
      localStorage.setItem("rate", JSON.stringify(data));
    } catch (error) {
      throw new Error(error);
    }
  };

  React.useEffect(() => {
    if (currentUserRating.length > 0) {
      currentUserRating.map((curRate) => {
        setCurrentUserRating({
          ...curRate,
          rating: rate,
        });
      });
    } else {
      setCurrentUserRating({
        ...currentUserRating,
        rating: rate,
      });
    }
  }, [rate]);

  React.useEffect(() => {
    fetchStar();
  }, []);

  return (
    <div className="rating-container">
      <p>Đánh giá: </p>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              id="input-star"
              value={ratingValue}
              onClick={() => {
                setRate(ratingValue);
                dispatch(setStar(currentUserRating));
                localStorage.setItem("rate", JSON.stringify(currentUserRating));
              }}
            />
            <AiFillStar
              size={20}
              className="star"
              color={
                ratingValue <=
                (hover ||
                  rate ||
                  JSON.parse(localStorage.getItem("rate"))[0]?.rating)
                  ? "yellow"
                  : "grey"
              }
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
                // dispatch(setStar(currentUserRating));
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
