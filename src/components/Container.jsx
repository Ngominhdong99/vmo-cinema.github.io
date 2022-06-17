import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, getUser, setCurrentUser } from "../services/store/action";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./common/Header";
import MovieHeader from "./common/MovieHeader";
import Slider from "./layout/Slider";
import HomeMovies from "./layout/HomeMovies";
import MovieInfo from "./layout/MovieInfo";
import WatchMovie from "./layout/WatchMovie";
import Footer from "../components/common/Footer";
import FilterMovie from "./layout/FilterMovie";
import Comment from "./sub-layout/Comment";
import LoginForm from "./login/LoginForm";
import Register from "./login/Register";
import Admin from "./admin/Admin";
import ListMovie from "./admin/ListMovie";
import ListUser from "./admin/ListUser";
import Users from "./admin/Users";
import ManageMovie from "./admin/ManageMovie";
import UserInfo from "./sub-layout/UserInfo";
import ChangePassword from "./sub-layout/ChangePassword";

function Container() {
  const state = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // pagination admin
  const [currentPage, setCurrentPage] = React.useState(1);
  const [moviePerPage] = React.useState(7);
  const [light, setLight] = React.useState(false);

  const {
    datas,
    currentData,
    searchData,
    users,
    currentUser,
    pickedMovie,
    userInput,
    currentUserRating,
    adminSearchData,
  } = state;

  React.useEffect(() => {
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
              <LoginForm users={users} currentUser={currentUser} />
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
          <Route
            path="list-user"
            element={<ListUser users={users} datas={datas} />}
          ></Route>
          <Route path="users" element={<Users userInput={userInput} />}></Route>
          <Route
            path="movie"
            element={<ManageMovie pickedMovie={pickedMovie} />}
          ></Route>
        </Route>
        <Route
          path="/"
          element={
            <>
              <MovieHeader />
              {/* <Header datas={datas} currentUser={currentUser} /> */}
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
              <MovieHeader />
              {/* <Header datas={datas} currentUser={currentUser} /> */}
              <MovieInfo
                datas={datas}
                currentData={currentData}
                currentUser={currentUser}
              />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="watch-movie/:id"
          element={
            <>
              <>
                <MovieHeader />
                <WatchMovie light={light} setLight={setLight} />
                <Comment
                  users={users}
                  currentUser={currentUser}
                  currentUserRating={currentUserRating}
                />
                <Footer />
              </>
            </>
          }
        ></Route>

        <Route
          path="filter-movie"
          element={
            <>
              <MovieHeader />
              {/* <Header datas={datas} /> */}
              <FilterMovie datas={datas} searchData={searchData} />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="user-info"
          element={
            <>
              <MovieHeader />
              <UserInfo />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="change-password"
          element={
            <>
              <MovieHeader />
              <ChangePassword />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default Container;
