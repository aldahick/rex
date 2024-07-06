import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import { range } from "remeda";

interface PaginationProps {
  /** 0-indexed */
  page: number;
  /** 1-indexed */
  count: number;
  onChange: (newPage: number) => void;
  buttonCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  onChange,
  buttonCount = 5,
}) => {
  const sideButtonCount = Math.floor(buttonCount / 2);
  const maxIndex = count - 1;
  const pageIndices = range(
    Math.max(0, page - sideButtonCount),
    Math.min(maxIndex, page + sideButtonCount) + 1,
  );

  const handleChange = (newPage: number) => {
    onChange(Math.max(0, Math.min(maxIndex, newPage)));
  };

  return (
    <BootstrapPagination className="justify-center">
      {page > sideButtonCount && (
        <>
          <BootstrapPagination.First onClick={() => handleChange(0)} />
          <BootstrapPagination.Prev onClick={() => handleChange(page - 1)} />
        </>
      )}
      {pageIndices.map((pageIndex) => (
        <BootstrapPagination.Item
          key={pageIndex}
          active={pageIndex === page}
          onClick={() => handleChange(pageIndex)}
        >
          {pageIndex + 1}
        </BootstrapPagination.Item>
      ))}
      {page < maxIndex - sideButtonCount && (
        <>
          <BootstrapPagination.Next onClick={() => handleChange(page + 1)} />
          <BootstrapPagination.Last onClick={() => handleChange(maxIndex)} />
        </>
      )}
    </BootstrapPagination>
  );
};
