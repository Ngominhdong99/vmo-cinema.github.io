import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPickedMovie,
  addMovie,
  updateMovie,
  getData,
} from "../../services/store/action";
import "../../scss/admin/ManageMovie.scss";
import MovieValidate from "../../validate/MovieValidate";
import styled from "styled-components";

function ManageMovie({ pickedMovie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState({});
  const [reload, setReload] = React.useState(false);

  const handleAddMovie = () => {
    const validate = MovieValidate(pickedMovie);
    if (!Object.values(validate).some((item) => item)) {
      dispatch(addMovie(pickedMovie));
      navigate("/admin/list-movie");
      dispatch(
        setPickedMovie({
          id: null,
          movie_title: "",
          number_of_chap: "",
          director: "",
          img: "",
          nation: "",
          duration: "",
          rating: "",
          year: "",
          status: "",
          category: "",
          movie_description: "",
          link: "",
          view: {
            week: "",
            month: "",
          },
        })
      );
    } else {
      setError(validate);
    }
  };

  const handleUpdateMovie = (pickedMovie) => {
    dispatch(updateMovie(pickedMovie));
    navigate("/admin/list-movie");
    dispatch(
      setPickedMovie({
        id: null,
        movie_title: "",
        number_of_chap: "",
        director: "",
        img: "",
        nation: "",
        duration: "",
        rating: "",
        year: "",
        status: "",
        category: "",
        movie_description: "",
        link: "",
        view: {
          week: "",
          month: "",
        },
      })
    );
  };
  const handleClear = (e) => {
    e.preventDefault();
    dispatch(
      setPickedMovie({
        id: null,
        movie_title: "",
        number_of_chap: "",
        director: "",
        img: "",
        nation: "",
        duration: "",
        rating: "",
        year: "",
        status: "",
        category: "",
        movie_description: "",
        link: "",
        view: {
          week: "",
          month: "",
        },
      })
    );
  };

  return (
    <>
      <form className="manage-container">
        <div className="manage-left">
          <div>
            <label>Movie name</label>
            <input
              type="text"
              value={pickedMovie.movie_title}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    movie_title: e.target.value,
                  })
                );
                setError({
                  ...error,
                  movie_title: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.movie_title}</ErrorMessage>
          <div>
            <label>Number of chap</label>
            <input
              type="text"
              value={pickedMovie.number_of_chap}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    number_of_chap: e.target.value,
                  })
                );
                setError({
                  ...error,
                  number_of_chap: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.number_of_chap}</ErrorMessage>
          <div>
            <label>Director</label>
            <input
              type="text"
              value={pickedMovie.director}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    director: e.target.value,
                  })
                );
                setError({
                  ...error,
                  director: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.director}</ErrorMessage>
          <div>
            <label>Image</label>
            <input
              type="text"
              value={pickedMovie.img}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    img: e.target.value,
                  })
                );
                setError({
                  ...error,
                  img: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.img}</ErrorMessage>
          <div>
            <label>Nation</label>
            <input
              type="text"
              value={pickedMovie.nation}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    nation: e.target.value,
                  })
                );
                setError({
                  ...error,
                  nation: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.nation}</ErrorMessage>
          <div>
            <label>Duration</label>
            <input
              type="text"
              value={pickedMovie.duration}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    duration: e.target.value,
                  })
                );
                setError({
                  ...error,
                  duration: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.duration}</ErrorMessage>
        </div>
        {/*  */}
        <div className="manage-right">
          <div>
            <label>Year</label>
            <input
              type="text"
              value={pickedMovie.year}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    year: e.target.value,
                  })
                );
                setError({
                  ...error,
                  year: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.year}</ErrorMessage>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={pickedMovie.category}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    category: e.target.value,
                  })
                );
                setError({
                  ...error,
                  category: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.category}</ErrorMessage>
          <div>
            <label>Status</label>
            <input
              type="text"
              value={pickedMovie.status}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    status: e.target.value,
                  })
                );
                setError({
                  ...error,
                  status: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.status}</ErrorMessage>
          <div>
            <label>Description</label>
            <textarea
              rows="7"
              value={pickedMovie.movie_description}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    movie_description: e.target.value,
                  })
                );
                setError({
                  ...error,
                  movie_description: "",
                });
              }}
            ></textarea>
          </div>
          <ErrorMessage>{error.movie_description}</ErrorMessage>
          <div>
            <label>Link</label>
            <input
              type="text"
              value={pickedMovie.link}
              onChange={(e) => {
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    link: e.target.value,
                  })
                );
                setError({
                  ...error,
                  link: "",
                });
              }}
            />
          </div>
          <ErrorMessage>{error.link}</ErrorMessage>
        </div>
      </form>
      <div className="btn-group">
        <button
          className={pickedMovie?.id ? "btn-inactive" : "btn-active"}
          onClick={() => handleAddMovie()}
        >
          Add
        </button>
        <button
          className={pickedMovie?.id ? "btn-active" : "btn-inactive"}
          onClick={() => handleUpdateMovie(pickedMovie)}
        >
          Update
        </button>
        <button className="btn-active" onClick={(e) => handleClear(e)}>
          Clear
        </button>
      </div>
    </>
  );
}

const ErrorMessage = styled.span`
  color: #f83333;
  transform: translateY(0.3rem);
`;

export default ManageMovie;
