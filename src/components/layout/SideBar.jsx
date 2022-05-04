import React, { useState } from "react";
import "../../scss/layout/SideBar.scss";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SideBar({ datas }) {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <p className="sidebar-header">Phim sắp chiếu</p>
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
                  <span>Lượt xem: {item.view.month}</span>
                  <div className="star">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <FaStarHalfAlt />
                  </div>
                  <p className="movie-year">{item.year}</p>
                  <p>{item.rate}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="sidebar-trending-section">
        <p className="sidebar-header">Trending</p>
        <div className="sidebar-trending-btn">
          <button className="btn" onClick={() => setFlag(false)}>
            Tuần
          </button>
          <button className="btn" onClick={() => setFlag(true)}>
            Tháng
          </button>
        </div>
        {datas.map((item, index) => {
          if (!flag) {
            if (
              (item.status === "on_air" || item.status === "new") &&
              item.view.week > 1000
            ) {
              return (
                <div
                  className="trending-item"
                  key={index}
                  onClick={() => {
                    navigate(`/movie-info/${item.id}`);
                  }}
                >
                  <p className="movie-title">{item.movie_title}</p>
                  <span>Lượt xem: {item.view.week} lượt/tuần</span>
                  <div className="star">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </div>
                </div>
              );
            }
          } else {
            if (
              (item.status === "on_air" || item.status === "new") &&
              // item.category.includes("action") &&
              item.view.month > 4500
            ) {
              return (
                <div
                  className="trending-item"
                  key={index}
                  onClick={() => {
                    navigate(`/movie-info/${item.id}`);
                  }}
                >
                  <p className="movie-title">{item.movie_title}</p>
                  <span>Lượt xem: {item.view.month} lượt/tháng</span>
                  <div className="star">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </div>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}

export default SideBar;
