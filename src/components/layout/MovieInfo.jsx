import React, { useEffect } from "react";
import "../../scss/layout/MovieInfo.scss";
import { useDispatch } from "react-redux";
import { getItem } from "../../services/store/action";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

function MovieInfo({ datas, currentData }) {
  const [currentUserRating, setCurrentUserRating] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchStar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/rate?movieId=${Number(id)}
        `
      );
      const data = await response.json();
      setCurrentUserRating(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getItem(id));
  }, [id, dispatch]);

  useEffect(() => {
    fetchStar();

    // setRate to local to show current rating
    const fetchCurrentStar = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/rate?movieId=${id}&userId=${
            JSON.parse(localStorage.getItem("user")).id
          }`
        );
        const data = await response.json();
        localStorage.setItem("rate", JSON.stringify(data));
      } catch (error) {
        throw new Error(error);
      }
    };
    //
    fetchCurrentStar();
  }, []);

  const totalValue = currentUserRating.reduce((total, rate) => {
    return (total = total + rate.rating);
  }, 0);
  return (
    <>
      <p className="movie-link">
        VMO Cinema / {currentData.nation} / {currentData.category} /{" "}
        {currentData.movie_title} / Info
      </p>
      <div className="info-container">
        <div className="info-left">
          <div className="select-section">
            <img src={currentData.img} alt={currentData.movie_title} />
            <div className="btn-container">
              <ButtonTrailer
                className="button"
                onClick={() => {
                  navigate(`/watch-movie/${id}`);
                }}
              >
                Trailer
              </ButtonTrailer>
              <ButtonWatch
                className="button"
                onClick={() => {
                  navigate(`/watch-movie/${id}`);
                }}
              >
                Xem phim
              </ButtonWatch>
            </div>
          </div>
          <div className="info-section">
            <div className="movie-describe">
              <p className="movie-title">{currentData.movie_title}</p>
              <div className="describe">
                <p className="movie-chap">
                  - S??? t???p: {currentData.number_of_chap} t???p
                </p>
                <p className="movie-director">
                  - ?????o di???n: {currentData.director}
                </p>
                <p className="movie-duration">
                  - Th???i l?????ng: {currentData.duration} ph??t
                </p>

                <p className="movie-nation">- Qu???c gia: {currentData.nation}</p>
                <p className="movie-year">
                  - N??m ph??t h??nh: {currentData.year}
                </p>
                <p className="movie-category">
                  - Th??? lo???i: {currentData.category}
                </p>
                <p className="movie-view">
                  - L?????t xem: {Math.floor(Math.random() * 10000)}
                  {/* - L?????t xem: {currentData.view.month} */}
                </p>
                <div className="movie-rating">
                  <p>
                    T???ng ??i???m ????nh gi??:{" "}
                    {(totalValue / currentUserRating.length).toFixed(2)}
                  </p>
                  <p>T???ng l?????t ????nh gi??: {currentUserRating.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-right">
          <h2>Phim s???p chi???u</h2>
          <div className="sidebar-section">
            {datas.map((item, index) => {
              if (item.status === "comming_soon") {
                return (
                  <div key={index} className="sidebar-item">
                    <img
                      src={item.img}
                      alt={item.movie_title}
                      onClick={() => {
                        navigate(`/movie-info/${item.id}`);
                      }}
                    />
                    <div className="movie-info">
                      <p
                        className="movie-title"
                        onClick={() => {
                          navigate(`/movie-info/${item.id}`);
                        }}
                      >
                        {item.movie_title}
                      </p>
                      <span>L?????t xem: {item.view.month}</span>
                      <div className="star">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </div>
                      <p className="movie-year">{item.year}</p>
                      <p>{item.rate}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="movie-information">
        <h2>N???i dung phim</h2>
        <p>{currentData.movie_description}</p>
      </div>
      <p className="home-movie-heading">C?? th??? b???n th??ch xem</p>
      <div className="home-movie-list">
        {datas.map((item, index) => {
          if (item.category === currentData.category) {
            return (
              <div
                className="movie-item"
                key={index}
                onClick={() => {
                  navigate(`/movie-info/${item.id}`);
                }}
              >
                <img src={item.img} alt={item.movie_title} className="" />
                <div className="home-movie-name">{item.movie_title}</div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

const ButtonTrailer = styled.button`
  color: #ffffff;
  background-color: #428bca;

  &:hover {
    background-color: #0693e3;
  }
`;
const ButtonWatch = styled.button`
  color: #ffffff;
  background-color: #d9534f;

  &:hover {
    background-color: #d43f3a;
  }
`;
export default MovieInfo;
