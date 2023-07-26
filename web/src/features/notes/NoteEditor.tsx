import { Breadcrumbs, Grid, Typography } from "@mui/material";
import React from "react";

import { useNoteQuery } from "../../graphql";
import { useStatus } from "../../hooks";
import { RexLink } from "../utils/RexLink";
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
          <RexLink to="/notes" color="inherit">
            Notes
          </RexLink>
          <Typography>{note.title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item>
        <EditNoteForm note={note} />
      </Grid>
    </Grid>
  );
};
