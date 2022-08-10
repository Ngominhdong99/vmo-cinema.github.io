import React from "react";
import "../../scss/admin/Pagination.scss";

const Pagination = ({ datas, moviePerPage, setCurrentPage }) => {
  const [current, setCurrent] = React.useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const numOfMovie = Math.ceil(datas.length / moviePerPage);
  for (let i = 1; i <= (numOfMovie < 1 ? numOfMovie + 1 : numOfMovie); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number, index) => (
          <li key={index} className={index + 1 === current ? "active" : null}>
            <a
              onClick={() => {
                paginate(number);
                setCurrent(index + 1);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
