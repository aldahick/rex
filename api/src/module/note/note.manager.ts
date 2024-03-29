import { injectable } from "@athenajs/core";

import { UserNoteModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database.service.js";

@injectable()
export class NoteManager {
  constructor(private readonly db: DatabaseService) {}

  async fetch(id: string, userId: string): Promise<UserNoteModel | undefined> {
    return this.db.userNotes.findBy({ userId, id }).selectAll();
  }

  async fetchMany(userId: string): Promise<UserNoteModel[]> {
    return this.db.userNotes.where({ userId }).selectAll();
  }

  async updateBody(id: string, userId: string, body: string): Promise<void> {
    await this.db.userNotes.where({ id, userId }).update({ body });
  }

  async create(userId: string, title: string): Promise<UserNoteModel> {
    return this.db.userNotes.create({
      userId,
      title,
      createdAt: new Date(),
      body: "",
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.db.userNotes.where({ userId, id }).delete();
  }
}
