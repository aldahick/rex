import React from "react";
import { useMatch } from "react-router";
import { NoteEditor } from "../features/notes/NoteEditor";

export const NoteRoute: React.FC = () => {
  const match = useMatch("/notes/:id");
  const id = match?.params.id;
  return id ? <NoteEditor id={id} /> : null;
};
