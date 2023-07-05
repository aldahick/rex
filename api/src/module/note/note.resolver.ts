import { resolveMutation, resolveQuery, resolver } from "@athenajs/core";

import {
  IAuthPermission,
  IMutation,
  IMutationCreateNoteArgs,
  IMutationRemoveNoteArgs,
  IMutationUpdateNoteBodyArgs,
  INote,
  IQuery,
  IQueryNoteArgs,
} from "../../graphql.js";
import { UserNoteModel } from "../../model/userNote.model.js";
import { RexContext } from "../auth/index.js";
import { NoteManager } from "./note.manager.js";

@resolver()
export class NoteResolver {
  constructor(private readonly noteManager: NoteManager) {}

  @resolveQuery()
  async note(
    root: never,
    { id }: IQueryNoteArgs,
    context: RexContext
  ): Promise<IQuery["note"]> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.ManageNotesSelf))
    ) {
      throw new Error("Forbidden");
    }
    const note = await this.noteManager.fetch(id, context.userId);
    if (!note) {
      throw new Error(`Note ${id} not found`);
    }
    return this.makeGql(note);
  }

  @resolveQuery()
  async notes(
    root: never,
    args: never,
    context: RexContext
  ): Promise<IQuery["notes"]> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.ManageNotesSelf))
    ) {
      throw new Error("Forbidden");
    }
    const notes = await this.noteManager.fetchMany(context.userId);
    return notes
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map((n) => this.makeGql(n));
  }

  @resolveMutation()
  async updateNoteBody(
    root: never,
    { id, body }: IMutationUpdateNoteBodyArgs,
    context: RexContext
  ): Promise<IMutation["updateNoteBody"]> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.ManageNotesSelf))
    ) {
      throw new Error("Forbidden");
    }
    await this.noteManager.updateBody(id, context.userId, body);
    return true;
  }

  @resolveMutation()
  async createNote(
    root: never,
    { title }: IMutationCreateNoteArgs,
    context: RexContext
  ): Promise<IMutation["createNote"]> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.ManageNotesSelf))
    ) {
      throw new Error("Forbidden");
    }
    const note = await this.noteManager.create(context.userId, title);
    return this.makeGql(note);
  }

  @resolveMutation()
  async removeNote(
    root: unknown,
    { id }: IMutationRemoveNoteArgs,
    context: RexContext
  ): Promise<IMutation["removeNote"]> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.ManageNotesSelf))
    ) {
      throw new Error("Forbidden");
    }
    await this.noteManager.remove(id, context.userId);
    return true;
  }

  makeGql(note: UserNoteModel): INote {
    return {
      ...note,
      createdAt: new Date(note.createdAt),
    };
  }
}
