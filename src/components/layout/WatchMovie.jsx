import React from "react";
import "../../scss/layout/WatchMovie.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem } from "../../services/store/action";

import { HiOutlineLightBulb, HiLightBulb } from "react-icons/hi";
import { AiOutlineDownload } from "react-icons/ai";

function MovieInfo({ light, setLight }) {
  const state = useSelector((state) => state.form);
  const { currentData, datas } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  React.useEffect(() => {
    dispatch(getItem(id));
  }, [id, dispatch]);

  if (light) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="movie-info-container">
      <p className="movie-link">
        VMO Cinema / {currentData.nation} / {currentData.category} /{" "}
        {currentData.movie_title} / Watch Movie
      </p>
      <div className={light ? "watch-movie" : ""}>
        <WatchMovie
          src={currentData.link}
          title={currentData.movie_title}
        ></WatchMovie>
        <div className="switch-theme-btn">
          <AiOutlineDownload fontSize={24} />
          {!light ? (
            <div onClick={() => setLight(!light)}>
              <span>Tắt đèn</span>
              <HiOutlineLightBulb fontSize={24} />
            </div>
          ) : (
            <div onClick={() => setLight(!light)}>
              <span>Bật đèn</span>
              <HiLightBulb fontSize={24} />
            </div>
          )}
        </div>
      </div>
      <>
        <Underline className="underline"></Underline>
        <div className="movie-describe-container">
          <div className="movie-describe">
            <img src={currentData.img} alt={currentData.movie_title} />
            <div className="describe">
              <p className="movie-title">
                - Tên Phim: {currentData.movie_title}
              </p>
              <p className="movie-chap">
                - Số tập: {currentData.number_of_chap} tập
              </p>
              <p className="movie-director">
                - Đạo diễn: {currentData.director}
              </p>
              <p className="movie-duration">
                - Thời lượng: {currentData.duration} phút
              </p>
              <p className="movie-description">
                - Mô tả: {currentData.movie_description}
              </p>
              <p className="movie-nation">- Quốc gia: {currentData.nation}</p>
              <p className="movie-year">- Năm phát hành: {currentData.year}</p>
            </div>
          </div>
          <div className="movie-suggestion">
            <p className="suggestion-title">Có thể bạn sẽ thích</p>
            <div className="suggest-movie">
              {datas.map((item, index) => {
                if (
                  item.category.includes(currentData.category) &&
                  item.rating === currentData.rating &&
                  item.status === currentData.status &&
                  item.movie_title !== currentData.movie_title
                ) {
                  return (
                    <div
                      key={index}
                      className="suggest-movie-item"
                      onClick={() => {
                        navigate(`/movie-info/${item.id}`);
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.movie_title}
                        key={item.id}
                      />
                      <p>{item.movie_title}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

const WatchMovie = styled.iframe`
  width: 100%;
  height: 40rem;
  border: none;
  z-index: 99;
`;
const Underline = styled.div`
  height: 3rem;
  width: 100%;
  background: #1a1a1a;
`;

export default MovieInfo;
