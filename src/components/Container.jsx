import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, getUser } from "../services/store/action";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Header from "./common/Header";
import Slider from "./layout/Slider";
import HomeMovies from "./layout/HomeMovies";
import MovieInfo from "./layout/MovieInfo";
import WatchMovie from "./layout/WatchMovie";
import Footer from "../components/common/Footer";
import FilterMovie from "./layout/FilterMovie";
// import Comment from "./sub-layout/Comment";
import LoginForm from "./login/LoginForm";
import Register from "./login/Register";
import Admin from "./admin/Admin";
import ListMovie from "./admin/ListMovie";
import ListUser from "./admin/ListUser";
import Users from "./admin/Users";
import ManageMovie from "./admin/ManageMovie";

function Container() {
  const state = useSelector((state) => state.form);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // pagination admin
  const [currentPage, setCurrentPage] = React.useState(1);
  const [moviePerPage] = React.useState(7);
  //

  const { datas, currentData, searchData, users, currentUser, pickedMovie } =
    state;

  React.useEffect(() => {
    // navigate("/admin");
    dispatch(getData());
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="app">
      <Routes>
        <Route
          path="login"
          element={
            <>
              <LoginForm users={users} />
            </>
          }
        ></Route>

        <Route
          path="register"
          element={
            <>
              <Register />
            </>
          }
        ></Route>
        <Route
          path="admin"
          element={
            <>
              <Admin />
            </>
          }
        >
          <Route
            path="list-movie"
            element={
              <ListMovie
                datas={datas}
                currentPage={currentPage}
                moviePerPage={moviePerPage}
                setCurrentPage={setCurrentPage}
              />
            }
          ></Route>
          <Route path="list-user" element={<ListUser users={users} />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route
            path="movie"
            element={<ManageMovie pickedMovie={pickedMovie} />}
          ></Route>
        </Route>
        <Route
          path="home-movie"
          element={
            <>
              <Header datas={datas} currentUser={currentUser} />
              <Slider datas={datas} />
              <HomeMovies datas={datas} currentData={currentData} />
              <Footer />
            </>
          }
        ></Route>
        <Route
          exactPath
          path={`movie-info/:id`}
          element={
            <>
              <Header datas={datas} currentUser={currentUser} />
              <MovieInfo datas={datas} currentData={currentData} />
              {/* <Comment /> */}
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="watch-movie/:id"
          element={
            <>
              <Header datas={datas} currentUser={currentUser} />
              <WatchMovie />
              {/* <Comment /> */}
              <Footer />
            </>
          }
        ></Route>

        <Route
          path="filter-movie"
          element={
            <>
              <Header datas={datas} />
              <FilterMovie datas={datas} searchData={searchData} />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Container;
