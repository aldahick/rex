import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { Pagination } from "../util/Pagination";
import { FileContent } from "./FileContent";
import { useRoot } from "./file.atom";

export const FileSeries: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPage = Number.parseInt(searchParams.get("p") ?? "0", 10);
  const [page, setPage] = useState(
    Number.isNaN(initialPage) || initialPage < 0 ? 0 : initialPage,
  );
  const [root] = useRoot();

  if (!root?.children?.length) {
    return null;
  }
  const selected = root.children[page];
  if (!selected) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const maxIndex = root.children.length - 1;

  return (
    <Container>
      <Row>
        <FileContent
          item={selected}
          onClick={() => handlePageChange(Math.min(maxIndex, page + 1))}
        />
      </Row>
      <Row>
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={root.children.length}
        />
      </Row>
    </Container>
  );
};
