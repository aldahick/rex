import { resolveQuery, resolver } from "@athenajs/core";

import {
  IProgress,
  IQuery,
  IQueryProgressArgs,
  IQueryProgressesArgs,
} from "../../graphql.js";
import { ProgressModel } from "../../model/index.js";
import { AuthContext } from "../auth/index.js";
import { ProgressManager } from "./progress.manager.js";

@resolver()
export class ProgressResolver {
  constructor(private readonly progressManager: ProgressManager) {}

  @resolveQuery()
  async progress(
    root: unknown,
    { id }: IQueryProgressArgs,
    context: AuthContext
  ): Promise<IQuery["progress"]> {
    if (!context.userId) {
      throw new Error("Forbidden");
    }
    const progress = await this.progressManager.fetch(id);
    return this.makeGql(progress);
  }

  @resolveQuery()
  async progresses(
    root: unknown,
    { ids }: IQueryProgressesArgs
  ): Promise<IQuery["progresses"]> {
    const progresses = await this.progressManager.fetchMany(ids);
    return progresses.map((p) => this.makeGql(p));
  }

  makeGql(progress: ProgressModel): IProgress {
    return {
      ...progress,
      createdAt: new Date(progress.createdAt),
      logs: [],
    };
  }
}
