import { Grid, Link, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useNotesQuery } from "../../graphql";
import { useStatus } from "../../hooks";
import { Table } from "../utils/Table";
import { AddNoteForm } from "./AddNoteForm";
import { DeleteNoteButton } from "./DeleteNoteButton";

export const NoteList: React.FC = () => {
  const notesResult = useNotesQuery();
  const status = useStatus();

  if (!notesResult.data || notesResult.error) {
    return status.error(notesResult.error);
  }

  const notes = notesResult.data.notes;

  return (
    <Grid container direction="column">
      <Grid item>
        <AddNoteForm onSubmit={notesResult.refetch} />
      </Grid>
      <Grid item xl={2} lg={3} md={4} sm={6}>
        <Table columns={["Title", "Created At"]}>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link component={RouterLink} to={`/notes/${note.id}`}>
                  {note.title}
                </Link>
              </TableCell>
              <TableCell>{new Date(note.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <DeleteNoteButton
                  noteId={note.id}
                  onSubmit={notesResult.refetch}
                />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Grid>
    </Grid>
  );
};
