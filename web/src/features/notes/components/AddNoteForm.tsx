import { useMutation } from "@apollo/client";
import { Button, Grid, TextField } from "@material-ui/core";
import gql from "graphql-tag";
import React, { useState } from "react";

import { IMutationCreateNoteArgs } from "../../../graphql";
import { useStatus } from "../../../hooks";

const MUTATION_CREATE_NOTE = gql`
mutation Web_CreateNote($title: String!) {
  note: createNote(title: $title) {
    _id
  }
}
`;

export const AddNoteForm: React.FC<{
  onSubmit: () => Promise<unknown>;
}> = ({ onSubmit }) => {
  const [createNote] = useMutation<unknown, IMutationCreateNoteArgs>(MUTATION_CREATE_NOTE);
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
          onChange={evt => setTitle(evt.target.value)}
          value={title}
        />
      </Grid>
      <Grid item>
        <Button onClick={submit}>
          Create Note
        </Button>
      </Grid>
    </Grid>
  );
};
