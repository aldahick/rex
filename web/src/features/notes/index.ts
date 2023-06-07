import { IAuthAction } from "../../graphql";
import { IFeature } from "../../IFeature";
import { NoteScene } from "./note.page";
import { NotesScene } from "./notes.page";

export const notesFeature: IFeature = {
  pages: [
    {
      route: "/notes",
      component: NotesScene,
      permissions: [{
        action: IAuthAction.ReadOwn,
        resource: "note"
      }],
      navbar: {
        title: "Notes",
      },
    },
    {
      route: "/notes/:noteId",
      component: NoteScene,
      permissions: [{
        action: IAuthAction.ReadOwn,
        resource: "note"
      }]
    }
  ]
};
