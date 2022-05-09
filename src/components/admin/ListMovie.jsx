import React from "react";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import {
  deleteMovie,
  setPickedMovie,
  getData,
} from "../../services/store/action";
import { useNavigate } from "react-router-dom";

function ListMovie({ datas, currentPage, moviePerPage, setCurrentPage }) {
  const indexOfLastMovie = currentPage * moviePerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
  const currentMovies = datas.slice(indexOfFirstMovie, indexOfLastMovie);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (data) => {
    dispatch(setPickedMovie(data));
    navigate("/admin/movie");
  };
  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  React.useEffect(() => {
    dispatch(getData());
  }, [handleDelete]);
  return (
    <>
      <table className="table">
        <thead>
          <tr className="tr">
            <th scope="col">Name</th>
            <th scope="col">Chapter</th>
            <th scope="col">Director</th>
            <th scope="col">Image</th>
            <th scope="col">Nation</th>
            <th scope="col">Duration</th>
            <th scope="col">Year</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            {/* <th scope="col">Description</th> */}
            <th scope="col">Link</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody id="movie">
          {currentMovies.map((data, index) => (
            <tr key={index}>
              <td>{data.movie_title}</td>
              <td>{data.number_of_chap}</td>
              <td>{data.director}</td>
              <td>{data.img}</td>
              <td>{data.nation}</td>
              <td>{data.duration}</td>
              <td>{data.year}</td>
              <td>{data.category}</td>
              <td>{data.status}</td>
              {/* <td>{data.movie_description}</td> */}
              <td>{data.link}</td>
              <td>
                <button onClick={() => handleEdit(data)}>Edit</button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        datas={datas}
        currentPage={currentPage}
        moviePerPage={moviePerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default ListMovie;
