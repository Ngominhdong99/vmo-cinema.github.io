import React, { useState } from "react";
import "../../scss/sub-layout/StarRating.scss";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCurrentUser, setStar } from "../../services/store/action";

function StarRating({ currentUser, params }) {
  const [currentUserRating, setCurrentUserRating] = React.useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  const [rate, setRate] = useState(null);
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (rate !== null) {
      setCurrentUserRating({
        ...currentUserRating,
        rating: rate,
      });
    }
  }, [rate]);

  React.useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
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
              }}
            />
            <AiFillStar
              size={20}
              className="star"
              color={
                ratingValue <= (hover || rate || currentUser?.rating)
                  ? "yellow"
                  : "grey"
              }
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
                dispatch(setStar(currentUserRating));
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
