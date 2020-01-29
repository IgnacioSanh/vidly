import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const pagesArray = _.range(1, totalPages);
  return (
    <nav>
      <ul className="pagination">
        {pagesArray.map(p => {
          const pageItemClass =
            currentPage === p ? "page-item active" : "page-item";
          return (
            <li className={pageItemClass} key={p}>
              <a
                href="#"
                className="page-link"
                onClick={() => {
                  onChangePage(p);
                }}
              >
                {p}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func
};

export default Pagination;
