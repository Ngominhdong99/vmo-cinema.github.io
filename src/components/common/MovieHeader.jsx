import React, { useState, useRef } from "react";
import "../../scss/common/MovieHeader.scss";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "../../services/store/action";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { setCurrentUser } from "../../services/store/action";
import { auth } from "../../Firebase/config";
import useDebounce from "../../hooks/useDebounce";

import { BiSearchAlt2, BiLogOut } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { BsArrowReturnRight } from "react-icons/bs";
import Tippy from "@tippyjs/react/headless";

function MovieHeader({}) {
  const [inputSearch, setInputSeach] = useState({
    movie_title_like: "",
    category_like: "",
    nation_like: "",
    status_like: "",
  });
  const [dataMovie, setDataMovie] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenu, setMobieMenu] = React.useState(false);
  const [showResult, setShowResult] = React.useState(true);
  const debounce = useDebounce(inputSearch.movie_title_like, 800);
  const [windowDimesion, detectHW] = useState({
    winWidth: window.innerWidth,
    // winHeight: window.innerHeight,
  });

  const headerRef = useRef();
  const inputRef = useRef();

  const fetchFilter = async () => {
    const paramsString = queryString.stringify(inputSearch, {
      skipEmptyString: true,
    });
    const response = await fetch(`http://localhost:3000/data/?${paramsString}`);
    const searchData = await response.json();
    dispatch(setSearchData(searchData));
  };

  React.useEffect(() => {
    if (!inputSearch.movie_title_like.trim()) {
      setDataMovie([]);
      return;
    }

    const fetchSearch = async () => {
      const response = await fetch(
        `http://localhost:3000/data/?movie_title_like=${debounce}`
      );
      const data = await response.json();
      setDataMovie(data);
    };
    fetchSearch();
  }, [debounce]);

  const handleDeleteSearch = () => {
    setInputSeach({
      ...inputSearch,
      movie_title_like: "",
    });
    setDataMovie([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const onChangeFilter = (key, value) => {
    const params = {
      movie_title_like: "",
      category_like: "",
      nation_like: "",
      status_like: "",
    };
    params[key] = value;
    setInputSeach(params);
  };

  React.useEffect(() => {
    fetchFilter();
  }, [inputSearch]);

  React.useEffect(() => {
    headerRef.current.addEventListener("click", function () {
      setMobieMenu(false);
    });
  }, [mobileMenu]);

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      // winHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", detectSize);
    if (windowDimesion.winWidth > 1300) {
      setMobieMenu(false);
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimesion]);

  return (
    <>
      <header ref={headerRef} className="header">
        <img
          src="/images/motchill.png"
          alt="web-logo"
          onClick={() => navigate("/")}
        />
        <div className="navbar-container">
          <Tippy
            placement="bottom"
            interactive
            visible={showResult && dataMovie.length > 0}
            onClickOutside={handleHideResult}
            render={(attrs) => (
              <div tabIndex="-1" {...attrs} className="search-result">
                <ul>
                  {dataMovie.map((item, index) => (
                    <div
                      key={index}
                      className="result-item"
                      onClick={() => {
                        navigate(`/movie-info/${item.id}`);
                        handleDeleteSearch();
                      }}
                    >
                      <BsArrowReturnRight color="#333" />
                      <li key={index}>{item.movie_title}</li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          >
            <div className="search-section">
              <BiSearchAlt2 className="search-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={inputSearch.movie_title_like}
                onFocus={() => setShowResult(true)}
                onChange={(e) => {
                  setInputSeach({
                    ...inputSearch,
                    movie_title_like: e.target.value,
                  });
                }}
              />
              {!!inputSearch.movie_title_like && (
                <TiDelete
                  className="delete-icon"
                  onClick={() => handleDeleteSearch()}
                />
              )}
            </div>
          </Tippy>

          <div className="navbar-section">
            <div className="drop-menu">
              <a href="/">Thể loại</a>
              <ul className="drop-down">
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "action");
                    navigate("/filter-movie");
                  }}
                >
                  Hành động
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "comedy");
                    navigate("/filter-movie");
                  }}
                >
                  Hài hước
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "romantic");
                    navigate("/filter-movie");
                  }}
                >
                  Tình cảm
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("category_like", "anime");
                    navigate("/filter-movie");
                  }}
                >
                  Anime
                </li>
              </ul>
            </div>
            <div className="drop-menu">
              <a href="/">Quốc gia</a>
              <ul className="drop-down">
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "america");
                    navigate("/filter-movie");
                  }}
                >
                  Mỹ
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "japan");
                    navigate("/filter-movie");
                  }}
                >
                  Nhật Bản
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "korea");
                    navigate("/filter-movie");
                  }}
                >
                  Hàn Quốc
                </li>
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeFilter("nation_like", "thailand");
                    navigate("/filter-movie");
                  }}
                >
                  Thái Lan
                </li>
              </ul>
            </div>
            <a
              href="/"
              className="drop-menu"
              onClick={(e) => {
                e.preventDefault();
                onChangeFilter("status_like", "new");
                navigate("/filter-movie");
              }}
            >
              Phim mới
            </a>
            <div className="login-btn">
              {JSON.parse(localStorage.getItem("user")) ? (
                <ul>
                  <li>
                    {/* <FaUserCircle className="icon-user" /> */}
                    {JSON.parse(localStorage.getItem("user")).userName}
                  </li>
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
                  {JSON.parse(localStorage.getItem("user"))?.role ===
                  "admin" ? (
                    <li className="admin" onClick={() => navigate("/admin")}>
                      Admin page
                    </li>
                  ) : (
                    <li
                      className="admin"
                      onClick={() => navigate("/user-info")}
                    >
                      Hồ sơ
                    </li>
                  )}
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
        </div>
        {mobileMenu ? (
          <BsXLg
            className="remove-mobile-menu"
            onClick={() => setMobieMenu(false)}
          />
        ) : (
          <AiOutlineMenu
            className="mobile-menu-btn"
            onClick={() => setMobieMenu(!mobileMenu)}
          />
        )}
      </header>
      {mobileMenu ? (
        <div className="mobile-menu">
          <ul>
            <li
              onClick={() => {
                navigate("/filter-movie");
              }}
            >
              Thể loại
            </li>
            <li
              onClick={() => {
                navigate("/filter-movie");
              }}
            >
              Quốc gia
            </li>
            <li
              onClick={() => {
                navigate("/filter-movie");
              }}
            >
              Phim mới
            </li>
            <li
              onClick={() => {
                navigate("/filter-movie");
              }}
            >
              Phim hot
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MovieHeader;
