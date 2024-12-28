// Pagination.jsx
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";

// Styled Components

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const ButtonStyle = styled.button`
  background-color: transparent;
  color: #007bff !important;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;

  &:hover:not(:disabled) {
    background-color: #007bff;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Using transient props by prefixing with '$' to prevent them from being passed to the DOM
const PageNumber = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 0.25rem;
  border-radius: 50% !important;
  background-color: ${(props) => (props.$isCurrent ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.$isCurrent ? "#fff" : "#000")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$isCurrent ? "#0056b3" : "#dcdcdc")};
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Pagination Component

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate the range of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Maximum number of visible page numbers
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    // Adjust the start and end if near the beginning or end
    if (currentPage <= 3) {
      start = 1;
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage + 2 >= totalPages) {
      start = Math.max(1, totalPages - (maxVisible - 1));
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      {/* Previous Button */}
      <ButtonStyle
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <ArrowForwardIosIcon />
      </ButtonStyle>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <PageNumber
          key={page}
          $isCurrent={page === currentPage}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
        >
          {page}
        </PageNumber>
      ))}

      {/* Next Button */}
      <ButtonStyle
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <ArrowBackIosIcon />
      </ButtonStyle>
    </PaginationContainer>
  );
};

export default Pagination;
