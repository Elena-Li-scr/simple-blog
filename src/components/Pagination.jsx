import { useState, useEffect } from "react";
import "./Pagination.css";

export default function Pagination({ totalPages, currentPage, OnPage }) {
  const [pageWindowStart, setPageWindowStart] = useState(1);
  const windowSize = 5;

  useEffect(() => {
    if (currentPage < pageWindowStart) {
      setPageWindowStart(Math.max(1, currentPage - windowSize + 1));
    } else if (currentPage >= pageWindowStart + windowSize) {
      setPageWindowStart(currentPage);
    }
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: windowSize },
    (_, i) => pageWindowStart + i
  ).filter((num) => num <= totalPages);

  const canGoBack = pageWindowStart > 1;
  const canGoForward = pageWindowStart + windowSize <= totalPages;

  return (
    <div className="pagination">
      {canGoBack ? (
        <button
          onClick={() => {
            const newStart = pageWindowStart - windowSize;
            setPageWindowStart(newStart);
            OnPage(newStart);
          }}
        >
          <img
            src="/assets/right.png"
            alt="left-arrow"
            className="left-arrow"
          />
        </button>
      ) : (
        <button>
          <img src="/assets/left.png" alt="left-arrow" />
        </button>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => OnPage(num)}
          className={num === currentPage ? "active" : ""}
        >
          {num}
        </button>
      ))}

      {canGoForward && (
        <button
          onClick={() => {
            const newStart = pageWindowStart + windowSize;
            setPageWindowStart(newStart);
            OnPage(newStart);
          }}
        >
          <img src="/assets/right.png" alt="right" />
        </button>
      )}
    </div>
  );
}
