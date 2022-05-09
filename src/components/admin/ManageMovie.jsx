import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPickedMovie,
  addMovie,
  updateMovie,
} from "../../services/store/action";
import "../../scss/admin/ManageMovie.scss";

function ManageMovie({ pickedMovie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddMovie = () => {
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
  return (
    <>
      <form className="manage-container">
        <div className="manage-left">
          <div>
            <label>Movie name</label>
            <input
              type="text"
              value={pickedMovie.movie_title}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    movie_title: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Number of chap</label>
            <input
              type="text"
              value={pickedMovie.number_of_chap}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    number_of_chap: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Director</label>
            <input
              type="text"
              value={pickedMovie.director}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    director: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              value={pickedMovie.img}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    img: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Nation</label>
            <input
              type="text"
              value={pickedMovie.nation}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    nation: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              type="text"
              value={pickedMovie.duration}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    duration: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        {/*  */}
        <div className="manage-right">
          <div>
            <label>Year</label>
            <input
              type="text"
              value={pickedMovie.year}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    year: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={pickedMovie.category}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    category: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Status</label>
            <input
              type="text"
              value={pickedMovie.status}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    status: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              rows="8"
              value={pickedMovie.movie_description}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    movie_description: e.target.value,
                  })
                )
              }
            ></textarea>
          </div>
          <div>
            <label>Link</label>
            <input
              type="text"
              value={pickedMovie.link}
              onChange={(e) =>
                dispatch(
                  setPickedMovie({
                    ...pickedMovie,
                    link: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
      </form>
      <div className="btn-group">
        <button onClick={() => handleAddMovie()}>Add</button>
        <button onClick={() => handleUpdateMovie(pickedMovie)}>Update</button>
      </div>
    </>
  );
}

export default ManageMovie;
