import { IProgressStatus } from "../graphql.js";
import { ProgressTable } from "../model/progress.model.js";
import { RoleTable } from "../model/role.model.js";
import { UserTable } from "../model/user.model.js";
import { change } from "../service/database/database.migration.js";

change(async (db) => {
  await db.createEnum(
    "progress_status",
    Object.values(IProgressStatus) as [IProgressStatus, ...IProgressStatus[]],
  );
  await db.createTable("steam_games", (t) => ({
    id: t.integer().primaryKey(),
    name: t.text(),
  }));
  await db.createTable("progress", (t) => ({
    id: t.uuid().primaryKey(),
    action: t.text(),
    createdAt: t.timestamp(),
    status: t.enum("progress_status"),
  }));
  await db.createTable("progress_logs", (t) => ({
    progressId: t
      .uuid()
      .primaryKey()
      .foreignKey(() => ProgressTable, "id"),
    createdAt: t.timestamp().primaryKey(),
    text: t.text(),
  }));
  await db.createTable("roles", (t) => ({
    id: t.uuid().primaryKey(),
    name: t.text(),
    permissions: t.array(t.text()),
  }));
  await db.createTable("users", (t) => ({
    id: t.uuid().primaryKey(),
    email: t.text().unique(),
    username: t.text().nullable(),
    passwordHash: t.text().nullable(),
  }));
  await db.createTable("user_roles", (t) => ({
    userId: t
      .uuid()
      .primaryKey()
      .foreignKey(() => UserTable, "id"),
    roleId: t
      .uuid()
      .primaryKey()
      .foreignKey(() => RoleTable, "id"),
  }));
  await db.createTable("user_notes", (t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid().foreignKey(() => UserTable, "id"),
    title: t.text(),
    body: t.text(),
    createdAt: t.timestamp(),
  }));
});
