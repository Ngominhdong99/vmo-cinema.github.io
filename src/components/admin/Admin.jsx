import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiLogOut, BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { setCurrentUser, adminSearch } from "../../services/store/action";
import "../../scss/admin/Admin.scss";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("data");
  const [searchInput, setSearchInput] = React.useState("");

  const fetchAdminSearch = async () => {
    const response = await fetch(
      `http://localhost:3000/${current}/?${
        current === "data" ? "movie_title_like=" : "userName_like="
      }${searchInput}`
    );
    const searchData = await response.json();
    dispatch(adminSearch(searchData));
  };

  React.useEffect(() => {
    navigate("list-movie");
  }, []);
  React.useEffect(() => {
    fetchAdminSearch();
  }, [searchInput]);

  React.useEffect(() => {
    setSearchInput("");
  }, [navigate]);

  return (
    <div className="admin-container">
      <div className="admin-menu">
        <div className="btn">
          <button
            className={"data" === current ? "active" : null}
            onClick={() => {
              navigate("list-movie");
              setCurrent("data");
            }}
          >
            Danh sách phim
          </button>
          <button
            className={"user" === current ? "active" : null}
            onClick={() => {
              navigate("list-user");
              setCurrent("user");
              setSearchInput("a");
            }}
          >
            Danh sách thành viên
          </button>
          <button
            className={"users" === current ? "active" : null}
            onClick={() => {
              navigate("users");
              setCurrent("users");
            }}
          >
            Quản lý thành viên
          </button>
          <button
            className={"movie" === current ? "active" : null}
            onClick={() => {
              navigate("movie");
              setCurrent("movie");
            }}
          >
            Quản lý danh mục phim
          </button>
          <div className="search-section">
            <BiSearchAlt2 className="search-icon" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                e.preventDefault();
                setSearchInput(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="icons-wrapper">
          <BiLogOut
            className="icon"
            onClick={() => {
              dispatch(setCurrentUser([]));
              localStorage.removeItem("user");
              navigate("/");
            }}
          />
          <AiOutlineHome
            className="icon"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className="admin-section">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
