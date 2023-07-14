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
    context: RexContext,
  ): Promise<IQuery["note"]> {
    const userId = await this.fetchUserId(context);
    const note = await this.noteManager.fetch(id, userId);
    if (!note) {
      throw new Error(`Note ${id} not found`);
    }
    return this.makeGql(note);
  }

  @resolveQuery()
  async notes(
    root: never,
    args: never,
    context: RexContext,
  ): Promise<IQuery["notes"]> {
    const userId = await this.fetchUserId(context);
    const notes = await this.noteManager.fetchMany(userId);
    return notes
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map((n) => this.makeGql(n));
  }

  @resolveMutation()
  async updateNoteBody(
    root: never,
    { id, body }: IMutationUpdateNoteBodyArgs,
    context: RexContext,
  ): Promise<IMutation["updateNoteBody"]> {
    const userId = await this.fetchUserId(context);
    await this.noteManager.updateBody(id, userId, body);
    return true;
  }

  @resolveMutation()
  async createNote(
    root: never,
    { title }: IMutationCreateNoteArgs,
    context: RexContext,
  ): Promise<IMutation["createNote"]> {
    const userId = await this.fetchUserId(context);
    const note = await this.noteManager.create(userId, title);
    return this.makeGql(note);
  }

  @resolveMutation()
  async removeNote(
    root: unknown,
    { id }: IMutationRemoveNoteArgs,
    context: RexContext,
  ): Promise<IMutation["removeNote"]> {
    const userId = await this.fetchUserId(context);
    await this.noteManager.remove(id, userId);
    return true;
  }

  makeGql(note: UserNoteModel): INote {
    return {
      ...note,
      createdAt: new Date(note.createdAt),
    };
  }

  private async fetchUserId(context: RexContext): Promise<string> {
    if (
      !context.userId ||
      !(await context.isAuthorized(IAuthPermission.AdminNotes))
    ) {
      throw new Error("Forbidden");
    }
    return context.userId;
  }
}
