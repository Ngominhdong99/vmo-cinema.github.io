import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { setCurrentUser } from "../../services/store/action";
import "../../scss/admin/Admin.scss";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("list-movie");

  React.useEffect(() => {
    navigate("list-movie");
  }, []);
  return (
    <div className="admin-container">
      <div className="admin-menu">
        <div className="btn">
          <button
            className={"list-movie" === current ? "active" : null}
            onClick={() => {
              navigate("list-movie");
              setCurrent("list-movie");
            }}
          >
            Danh sách phim
          </button>
          <button
            className={"list-user" === current ? "active" : null}
            onClick={() => {
              navigate("list-user");
              setCurrent("list-user");
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
