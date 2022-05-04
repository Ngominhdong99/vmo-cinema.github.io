import React from "react";
import SideBar from "./SideBar";
import "../../scss/layout/HomeMovie.scss";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function HomeMovies({ datas }) {
  const navigate = useNavigate();

  return (
    <div className="home-movie-container">
      <div className="home-movie-section">
        <p className="home-movie-heading">Phim mới cập nhật</p>
        <div className="home-movie-list">
          {datas.map((item, index) => {
            if (item.status === "new") {
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
        <Underline className="underline"></Underline>
        <p className="home-movie-heading">Phim đang công chiếu</p>
        <div className="home-movie-list">
          {datas.map((item, index) => {
            if (item.status === "on_air") {
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
        <Underline className="underline"></Underline>
        <p className="home-movie-heading">Anime Hot</p>
        <div className="home-movie-list">
          {datas.map((item, index) => {
            if (item.category.includes("anime")) {
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
      </div>
      <SideBar datas={datas} />
    </div>
  );
}

const Underline = styled.div`
  height: 3rem;
  width: 100%;
  background: #1a1a1a;
`;
export default HomeMovies;
