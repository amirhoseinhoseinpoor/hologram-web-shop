import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import style from "./Pagination.module.scss";

const pageWindow = (current, total) => {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = pageWindow(currentPage, totalPages);

  return (
    <nav className={style.pagination} aria-label="صفحه‌بندی">
      <button
        type="button"
        aria-label="صفحه قبل"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronRightIcon aria-hidden="true" />
      </button>
      {pages.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 && page - pages[index - 1] > 1 && (
            <span aria-hidden="true">…</span>
          )}
          <button
            type="button"
            className={page === currentPage ? style.active : ""}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page.toLocaleString("fa-IR")}
          </button>
        </React.Fragment>
      ))}
      <button
        type="button"
        aria-label="صفحه بعد"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronLeftIcon aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
