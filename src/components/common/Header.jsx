import React, { useState } from "react";
import "../../scss/common/Header.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "../../services/store/action";
import { useDispatch } from "react-redux";
import queryString from "query-string";

function Header() {
  const [inputSearch, setInputSeach] = useState({
    movie_title_like: "",
    category_like: "",
    nation_like: "",
    status_like: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchSearch = async () => {
    const paramsString = queryString.stringify(inputSearch, {
      skipEmptyString: true,
    });
    const response = await fetch(`http://localhost:3000/data/?${paramsString}`);
    const searchData = await response.json();
    dispatch(setSearchData(searchData));
  };

  const handleSearch = () => {
    fetchSearch();
    navigate("/filter-movie");
  };

  return (
    <header className="header">
      <div className="header-nav">
        <img
          src="/images/motchill.png"
          alt="logo"
          onClick={() => navigate("/home-movie")}
        />
        <div className="nav-items">
          <ul>
            <li>
              Thể Loại
              <ul className="sub-nav-category">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      category_like: "action",
                    });
                  }}
                >
                  Hành Động
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      category_like: "comedy",
                    });
                  }}
                >
                  Hài Hước
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      category_like: "romantic",
                    });
                  }}
                >
                  Tình Cảm
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      category_like: "anime",
                    });
                  }}
                >
                  Anime
                </a>
              </ul>
            </li>
            <li>
              Quốc Gia
              <ul className="sub-nav-nation">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      nation_like: "america",
                    });
                  }}
                >
                  Mỹ
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      nation_like: "japan",
                    });
                  }}
                >
                  Nhật Bản
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      nation_like: "korea",
                    });
                  }}
                >
                  Hàn Quốc
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/filter-movie");
                    fetchSearch();
                    setInputSeach({
                      ...inputSearch,
                      nation_like: "thailand",
                    });
                  }}
                >
                  Thái Lan
                </a>
              </ul>
            </li>
            <li>
              <a
                href="/"
                className="link"
                to="filter-movie"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/filter-movie");
                  fetchSearch();
                  setInputSeach({
                    ...inputSearch,
                    status_like: "new",
                  });
                }}
              >
                Phim mới
              </a>
            </li>
            <li>
              <a
                className="link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/filter-movie");
                  fetchSearch();
                  setInputSeach({
                    ...inputSearch,
                    status_like: "most_rated",
                  });
                }}
              >
                Top rate
              </a>
            </li>
            <li>
              <a
                className="link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/filter-movie");
                  fetchSearch();
                  setInputSeach({
                    ...inputSearch,
                    status_like: "on_air",
                  });
                }}
              >
                Đang chiếu
              </a>
            </li>
          </ul>
        </div>
        <div className="login-btn">
          <a
            href="/"
            onClick={(e) => {
              navigate("/login");
              e.preventDefault();
            }}
          >
            Đăng nhập
          </a>
        </div>
      </div>
      <div className="search-box">
        <div className="search-section">
          <BiSearchAlt2 className="search-icon" />
          <input
            type="search"
            placeholder="Search"
            value={inputSearch.movie_title_like}
            onChange={(e) => {
              handleSearch();
              setInputSeach({
                ...inputSearch,
                movie_title_like: e.target.value,
              });
            }}
            onMouseLeave={() =>
              setInputSeach({
                ...inputSearch,
                movie_title_like: "",
              })
            }
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
