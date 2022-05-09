import React from "react";
import "../../scss/admin/Pagination.scss";

const Pagination = ({ datas, moviePerPage, setCurrentPage }) => {
  const [isCurrent, setIscurrent] = React.useState(false);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const numOfMovie = Math.ceil(datas.length / moviePerPage);
  for (let i = 1; i <= (numOfMovie < 1 ? numOfMovie + 1 : numOfMovie); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => {
                paginate(number);
                setIscurrent(true);
              }}
              //   className={isCurrent ? "current" : ""}
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
