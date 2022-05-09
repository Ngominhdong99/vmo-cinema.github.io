import React from "react";
import "../../scss/layout/FilterMovie.scss";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { setSearchData } from "../../services/store/action";
import { useDispatch } from "react-redux";

function FilterMovie({ searchData, datas }) {
  const [inputFilter, setInputFilter] = React.useState({
    category_like: "",
    nation_like: "",
    year_like: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchSearch = async () => {
    const paramsString = queryString.stringify(inputFilter, {
      skipEmptyString: true,
    });

    const response = await fetch(`http://localhost:3000/data/?${paramsString}`);
    const searchData = await response.json();
    dispatch(setSearchData(searchData));
  };

  const handleFilter = () => {
    fetchSearch();
    setInputFilter({
      category_like: "",
      nation_like: "",
      year_like: "",
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-title">
        <p>Lọc phim</p>
      </div>
      <div className="filter">
        <select
          value={inputFilter.category_like}
          onChange={(e) => {
            setInputFilter({
              ...inputFilter,
              category_like: e.target.value,
            });
          }}
        >
          <option>--Thể loại--</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Romantic</option>
          <option>Anime</option>
          <option>Investigate</option>
          <option>Horror</option>
        </select>
        <select
          value={inputFilter.nation_like}
          onChange={(e) => {
            setInputFilter({
              ...inputFilter,
              nation_like: e.target.value,
            });
          }}
        >
          <option>--Quốc gia--</option>
          <option>America</option>
          <option>Japan</option>
          <option>Korea</option>
          <option>Thailand</option>
        </select>
        <select
          value={inputFilter.year_like}
          onChange={(e) => {
            setInputFilter({
              ...inputFilter,
              year_like: e.target.value,
            });
          }}
        >
          <option>--Năm--</option>
          {[...Array(23)].map((year, index) => {
            return <option key={index}>{`20${index + 1}`}</option>;
          })}
        </select>
        <button onClick={() => handleFilter()} className="btn-filter">
          Lọc
        </button>
      </div>
      <div className="movie-section">
        {(searchData.length === 0 ? datas : searchData).map((movie, index) => {
          return (
            <div
              className="movie-item"
              key={index}
              onClick={() => {
                navigate(`/movie-info/${movie.id}`);
              }}
            >
              <img src={movie.img} alt={movie.movie_title} />
              <p>{movie.movie_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterMovie;
