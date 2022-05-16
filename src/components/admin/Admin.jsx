import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { setCurrentUser } from "../../services/store/action";
import "../../scss/admin/Admin.scss";

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigate("list-movie");
  }, []);
  return (
    <div className="admin-container">
      <div className="admin-menu">
        <div className="btn">
          <button onClick={() => navigate("list-movie")}>Danh sách phim</button>
          <button onClick={() => navigate("list-user")}>
            Danh sách thành viên
          </button>
          <button onClick={() => navigate("users")}>Quản lý thành viên</button>
          <button onClick={() => navigate("movie")}>
            Quản lý danh mục phim
          </button>
        </div>
        <BiLogOut
          className="icon"
          onClick={() => {
            dispatch(setCurrentUser([]));
            localStorage.removeItem("user");
            navigate("/");
          }}
        />
      </div>
      <div className="admin-section">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
