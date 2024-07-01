import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { Container, Pagination, Row } from "react-bootstrap";
import { range } from "remeda";
import { MediaLoader } from "../../routes/media.$";
import { FileContent } from "./FileContent";

const PAGE_BUTTONS = 5;
const PAGE_SIDE_BUTTONS = Math.floor(PAGE_BUTTONS / 2);

export const FileSeries: React.FC = () => {
  const { root } = useLoaderData<MediaLoader>();
  const [index, setIndex] = useState(0);

  if (!root?.children?.length) {
    return null;
  }

  const selected = root.children[index];
  if (!selected) {
    return null;
  }

  const handlePageClick = (nextIndex: number) => () => {
    setIndex(nextIndex);
    window.scrollTo(0, 0);
  };

  const maxIndex = root.children.length - 1;
  const pageIndices = range(
    Math.max(0, index - PAGE_SIDE_BUTTONS),
    Math.min(maxIndex, index + PAGE_SIDE_BUTTONS) + 1,
  );

  return (
    <Container>
      <Row>
        <FileContent
          item={selected}
          onClick={handlePageClick(Math.min(maxIndex, index + 1))}
        />
      </Row>
      <Row>
        <Pagination className="justify-center">
          {index > PAGE_SIDE_BUTTONS && (
            <>
              <Pagination.First onClick={handlePageClick(0)} />
              <Pagination.Prev onClick={handlePageClick(index - 1)} />
            </>
          )}
          {pageIndices.map((pageIndex) => (
            <Pagination.Item
              key={pageIndex}
              active={pageIndex === index}
              onClick={handlePageClick(pageIndex)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
          {index < maxIndex - PAGE_SIDE_BUTTONS && (
            <>
              <Pagination.Next onClick={handlePageClick(index + 1)} />
              <Pagination.Last onClick={handlePageClick(maxIndex)} />
            </>
          )}
        </Pagination>
      </Row>
    </Container>
  );
};
