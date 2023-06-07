import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import gql from "graphql-tag";
import React from "react";

import { IMutationRemoveNoteArgs } from "../../../graphql";
import { useStatus } from "../../../hooks";

const MUTATION_REMOVE_NOTE = gql`
mutation Web_RemoveNote($id: String!) {
  removeNote(id: $id)
}
`;

export const DeleteNoteButton: React.FC<{
  noteId: string;
  onSubmit: () => Promise<unknown>;
}> = ({ noteId, onSubmit }) => {
  const [removeNote] = useMutation<unknown, IMutationRemoveNoteArgs>(MUTATION_REMOVE_NOTE);
  const status = useStatus();

  const submit = async () => {
    // eslint-disable-next-line no-alert,no-restricted-globals
    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await removeNote({ variables: { id: noteId } });
      await onSubmit();
      status.success(`Deleted note id=${noteId}`);
    } catch (err) {
      status.error(err);
    }
  };

  return (
    <IconButton color="secondary" onClick={submit}>
      <DeleteIcon />
    </IconButton>
  );
};
