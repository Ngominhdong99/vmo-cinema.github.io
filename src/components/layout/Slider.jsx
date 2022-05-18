import React, { useEffect, useRef, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../../scss/layout/Slider.scss";
import styled from "styled-components";
import { SmoothHorizontalScrolling } from "../../ultils/index";
import { useNavigate } from "react-router-dom";

function Slider({ datas }) {
  const sliderRef = useRef();
  const movieRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const navigate = useNavigate();

  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        movieRef.current.clientWidth * 3,
        sliderRef.current.scrollLeft
      );
    }
  };

  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -movieRef.current.clientWidth * 3,
        sliderRef.current.scrollLeft
      );
    }
  };

  useEffect(() => {
    if (isDrag) {
      if (dragMove < dragDown) {
        handleScrollRight();
      } else {
        handleScrollLeft();
      }
    }
  }, [dragDown, dragMove, isDrag]);

  const onDragStart = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
  };
  const onDragEnd = (e) => {
    setIsDrag(false);
  };
  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      const maxScrollLeft =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      if (sliderRef.current.scrollLeft < maxScrollLeft) {
        handleScrollRight();
      } else if (sliderRef.current.scrollLeft > 0) {
        handleScrollLeft();
      }
    }, 7000);
    return () => {
      clearInterval(autoScroll);
    };
  });
  return (
    <MoviesRowContainer className="slider-section" draggable="false">
      <p className="heading">Phim đề cử</p>
      <MoviesSlider
        ref={sliderRef}
        className="slider"
        draggable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
      >
        {datas.map((item, index) => {
          if (item.status === "most_rated") {
            return (
              <div
                key={index}
                className="movie-item"
                ref={movieRef}
                draggable="false"
                onClick={() => {
                  navigate(`/movie-info/${item.id}`);
                }}
              >
                <img src={item.img} alt={item.movie_title} draggable="false" />
                <div className="movie-name">{item.movie_title}</div>
              </div>
            );
          }
        })}
      </MoviesSlider>
      <div className="slider-icon">
        <FiChevronLeft className="left-icon" onClick={handleScrollLeft} />
        <FiChevronRight className="right-icon" onClick={handleScrollRight} />
      </div>
    </MoviesRowContainer>
  );
}

const MoviesRowContainer = styled.div`
  background-color: #333;
  color: #f1f1f1;
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .slider-icon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    user-select: none;

    .left-icon {
      color: #000;
      background: #f1f1f1;
      opacity: 0.8;
      height: 3.5rem;
      width: 2rem;
      border-radius: 5px;
      cursor: pointer;
      margin-top: -19%;
      z-index: 11;

      &:hover {
        transform: scale(1.2);
        transition: all 0.3s linear;
      }
    }

    .right-icon {
      color: #000;
      background: #f1f1f1;
      opacity: 0.8;
      height: 3.5rem;
      width: 2rem;
      border-radius: 5px;
      cursor: pointer;
      margin-top: -19%;
      z-index: 11;

      &:hover {
        transform: scale(1.2);
        transition: all 0.3s linear;
      }
    }
  }
`;
const MoviesSlider = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  transition: all 0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 28px 0 28px 0;
  scroll-behavior: smooth;

  &:hover .movie-item {
    opacity: 0.5;
  }

  .movie-item {
    max-width: 200px;
    max-height: 300px;
    width: 50%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    border-radius: 6px;
    transform: center left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.1);
      z-index: 10;
      opacity: 1;
    }

    & img {
      width: 180px;
      height: 280px;
      object-fit: cover;
      cursor: pointer;
      border-radius: 5px;
    }

    & .movie-name {
      background: black;
      margin-top: -10%;
      height: 1.3rem;
      width: 100%;
      text-align: center;
      opacity: 0.8;
    }
  }
`;

export default Slider;
