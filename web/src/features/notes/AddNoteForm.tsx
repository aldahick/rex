import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import { useCreateNoteMutation } from "../../graphql";
import { useStatus } from "../../hooks";

export const AddNoteForm: React.FC<{
  onSubmit: () => Promise<unknown>;
}> = ({ onSubmit }) => {
  const [createNote] = useCreateNoteMutation();
  const [title, setTitle] = useState<string>("");
  const status = useStatus();

  const submit = async () => {
    if (!title) {
      return;
    }
    try {
      await createNote({ variables: { title } });
      await onSubmit();
      status.success(`Created note "${title}"`);
    } catch (err) {
      status.error(err);
    }
  };

  return (
    <Grid container>
      <Grid item>
        <TextField
          placeholder="Title"
          onChange={(evt) => setTitle(evt.target.value)}
          value={title}
        />
      </Grid>
      <Grid item>
        <Button onClick={submit}>Create Note</Button>
      </Grid>
    </Grid>
  );
};
