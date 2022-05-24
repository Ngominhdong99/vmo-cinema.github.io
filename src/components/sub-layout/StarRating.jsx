import React, { useState } from "react";
import "../../scss/sub-layout/StarRating.scss";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addStar, setCurrentUser, setStar } from "../../services/store/action";

function StarRating({ params }) {
  const [currentUserRating, setCurrentUserRating] = React.useState({
    userId: JSON.parse(localStorage.getItem("user")).id,
    rating: 0,
    movieId: Number(params.id),
  });
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
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

  // console.log(currentUserRating);

  const handleSetRating = (ratingValue) => {
    if (JSON.parse(localStorage.getItem("rate")).length > 0) {
      console.log("gg");
      dispatch(setStar(currentUserRating));
      localStorage.setItem("rate", JSON.stringify(currentUserRating));
    } else if (JSON.parse(localStorage.getItem("rate")).length === 0) {
      dispatch(
        addStar({
          userId: JSON.parse(localStorage.getItem("user")).id,
          rating: Number(ratingValue),
          movieId: Number(params.id),
        })
      );
      localStorage.setItem("rate", JSON.stringify(currentUserRating));
    }
  };
  React.useEffect(() => {
    // if (currentUserRating.length > 0) {
    //   currentUserRating.map((curRate) => {
    //     setCurrentUserRating({
    //       ...curRate,
    //       rating: rate,
    //     });
    //   });
    // } else {
    setCurrentUserRating({
      ...currentUserRating[0],
      rating: rate,
    });
    // }
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
                handleSetRating(ratingValue);
                // localStorage.setItem("rate", JSON.stringify(currentUserRating));
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
