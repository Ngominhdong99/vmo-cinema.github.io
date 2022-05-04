import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../services/store/action";
import { Routes, Route, useNavigate } from "react-router-dom";
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

function Container() {
  const state = useSelector((state) => state.form);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { datas, currentData, searchData } = state;

  React.useEffect(() => {
    navigate("/login");
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="login"
          element={
            <>
              <LoginForm />
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
          path="home-movie"
          element={
            <>
              <Header datas={datas} />
              <Slider datas={datas} />
              <HomeMovies datas={datas} currentData={currentData} />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path={`movie-info/:id`}
          element={
            <>
              <Header datas={datas} />
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
              <Header datas={datas} />
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
