import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNeighbours: number;
  handleFirstPage: () => void;
  handleLastPage: () => void;
  setCurrentPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageNeighbours,
  handleFirstPage,
  handleLastPage,
  setCurrentPage,
}) => {
  const getPageRange = () => {
    let startPage = Math.max(1, currentPage - pageNeighbours);
    let endPage = Math.min(totalPages, currentPage + pageNeighbours);

    const totalPageNumbers = pageNeighbours * 2 + 1;
    const totalPageRange = endPage - startPage + 1;

    if (totalPageRange < totalPageNumbers) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, totalPageNumbers);
      } else {
        startPage = Math.max(1, endPage - totalPageNumbers + 1);
      }
    }

    const pageRange = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    return pageRange;
  };

  return (
    <div className="pagination">
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        className="pageButton font-Roboto"
      >
        First Page
      </button>

      {getPageRange().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          disabled={currentPage === pageNumber}
          className="numButton font-Roboto"
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        className="pageButton font-Roboto"
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
