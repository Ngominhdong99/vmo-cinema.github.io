import React, { useState } from "react";
import "../../scss/common/Header.scss";
import { BiSearchAlt2, BiLogOut } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "../../services/store/action";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { setCurrentUser } from "../../services/store/action";
import { auth } from "../../Firebase/config";

function Header({ currentUser }) {
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

  const onChangeFilter = (key, value) => {
    const params = {
      movie_title_like: "",
      category_like: "",
      nation_like: "",
      status_like: "",
    };
    params[key] = value;
    console.log(params);
    setInputSeach(params);
  };

  React.useEffect(() => {
    fetchSearch();
  }, [inputSearch]);

  return (
    <header className="header">
      <div className="header-nav">
        <img
          src="/images/motchill.png"
          alt="logo"
          onClick={() => navigate("/")}
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
                    onChangeFilter("category_like", "action");
                    navigate("/filter-movie");
                  }}
                >
                  Hành Động
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "comedy");
                    navigate("/filter-movie");
                  }}
                >
                  Hài Hước
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "romantic");
                    navigate("/filter-movie");
                  }}
                >
                  Tình Cảm
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "anime");
                    navigate("/filter-movie");
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
                    onChangeFilter("nation_like", "america");
                    navigate("/filter-movie");
                  }}
                >
                  Mỹ
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "japan");
                    navigate("/filter-movie");
                  }}
                >
                  Nhật Bản
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "korea");
                    navigate("/filter-movie");
                  }}
                >
                  Hàn Quốc
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "thailand");
                    navigate("/filter-movie");
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
                  onChangeFilter("status_like", "new");
                  navigate("/filter-movie");
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
                  onChangeFilter("status_like", "most_rated");
                  navigate("/filter-movie");
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
                  onChangeFilter("status_like", "on_air");
                  navigate("/filter-movie");
                }}
              >
                Đang chiếu
              </a>
            </li>
          </ul>
        </div>
        <div className="login-btn">
          {JSON.parse(localStorage.getItem("user")) ? (
            <ul>
              <li>{JSON.parse(localStorage.getItem("user")).userName}</li>
              <li
                className="user"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("rate");
                  dispatch(setCurrentUser(""));
                  auth.signOut();
                }}
              >
                Sign Out
                <BiLogOut />
              </li>
            </ul>
          ) : (
            <a
              href="/"
              onClick={(e) => {
                navigate("/login");
                e.preventDefault();
              }}
            >
              Đăng nhập
            </a>
          )}
        </div>
      </div>
      <div className="search-box">
        <div className="search-section">
          <div>
            <BiSearchAlt2 className="search-icon" />
          </div>
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
