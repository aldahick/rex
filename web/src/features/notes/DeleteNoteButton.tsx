import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React from "react";
import { useRemoveNoteMutation } from "../../graphql";
import { useStatus } from "../../hooks";

export const DeleteNoteButton: React.FC<{
  noteId: string;
  onSubmit: () => Promise<unknown>;
}> = ({ noteId, onSubmit }) => {
  const [removeNote] = useRemoveNoteMutation();
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
