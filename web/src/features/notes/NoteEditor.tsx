import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useNoteQuery } from "../../graphql";
import { useStatus } from "../../hooks";
import { EditNoteForm } from "./EditNoteForm";

interface NoteEditorProps {
  id: string;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ id }) => {
  const noteResult = useNoteQuery({ variables: { id } });
  const status = useStatus();

  const note = noteResult.data?.note;
  if (noteResult.error || !note) {
    return status.error(noteResult.error);
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Breadcrumbs>
          <Link component={RouterLink} to="/notes" color="inherit">
            Notes
          </Link>
          <Typography>{note.title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item>
        <EditNoteForm note={note} />
      </Grid>
    </Grid>
  );
};
