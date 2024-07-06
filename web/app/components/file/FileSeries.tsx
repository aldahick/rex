import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { MediaLoader } from "../../routes/media.$";
import { Pagination } from "../util/Pagination";
import { FileContent } from "./FileContent";

export const FileSeries: React.FC = () => {
  const { root } = useLoaderData<MediaLoader>();
  const [page, setPage] = useState(0);

  if (!root?.children?.length) {
    return null;
  }

  const selected = root.children[page];
  if (!selected) {
    return null;
  }

  const maxIndex = root.children.length - 1;

  return (
    <Container>
      <Row>
        <FileContent
          item={selected}
          onClick={() => setPage(Math.min(maxIndex, page + 1))}
        />
      </Row>
      <Row>
        <Pagination
          page={page}
          onChange={setPage}
          count={root.children.length}
        />
      </Row>
    </Container>
  );
};
