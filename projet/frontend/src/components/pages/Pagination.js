import React from "react";
import "./Footer.css";
const Pagination = ({ itemPerPage, paginate, totalitems, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalitems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination-item  ">
            <span
              className={currentPage === number ? "page-item active" : null}
            >
              <a href className="page-link " onClick={() => paginate(number)}>
                {number}
              </a>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
