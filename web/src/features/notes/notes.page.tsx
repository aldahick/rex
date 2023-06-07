import { useQuery } from "@apollo/client";
import {
  CircularProgress,
  Grid, Link, TableCell, TableRow,
} from "@material-ui/core";
import gql from "graphql-tag";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { IQuery } from "../../graphql";
import { useStatus } from "../../hooks";
import { Table } from "../utils/components";
import { AddNoteForm } from "./components/AddNoteForm";
import { DeleteNoteButton } from "./components/DeleteNoteButton";

const QUERY_NOTES = gql`
query Web_Notes {
  notes {
    _id
    createdAt
    title
  }
}
`;

export const NotesScene: React.FC = () => {
  const {
    loading, data: { notes } = {}, refetch, error
  } = useQuery<{ notes: IQuery["notes"] }>(QUERY_NOTES);
  const status = useStatus();

  if (loading || !notes) {
    return <CircularProgress />;
  }
  if (error) {
    return status.error(error.message);
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <AddNoteForm onSubmit={refetch} />
      </Grid>
      <Grid item xl={2} lg={3} md={4} sm={6}>
        <Table columns={["Title", "Created At"]}>
          {notes.map(note => (
            <TableRow key={note._id}>
              <TableCell>
                <Link component={RouterLink} to={`/notes/${note._id}`}>
                  {note.title}
                </Link>
              </TableCell>
              <TableCell>
                {new Date(note.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <DeleteNoteButton noteId={note._id} onSubmit={refetch} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Grid>
    </Grid>
  );
};
