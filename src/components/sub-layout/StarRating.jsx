import React, { useState } from "react";
import "../../scss/sub-layout/StarRating.scss";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setStar, getData } from "../../services/store/action";

function StarRating({ id, currentData }) {
  const [rate, setRate] = useState(null);
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    currentData.rating = rate;
  }, [rate]);
  return (
    <div>
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
                dispatch(setStar(currentData));
              }}
            />
            <AiFillStar
              size={40}
              className="star"
              color={
                ratingValue <= (hover || rate || currentData.rating)
                  ? "yellow"
                  : "grey"
              }
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
                dispatch(setStar(currentData));
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
