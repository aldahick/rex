import "./adapter/jira.adapter.js";

import { injectable } from "@athenajs/core";
import { IProjectAdapterType } from "../../graphql.js";
import {
  BaseProjectAdapter,
  injectProjectAdapters,
} from "./adapter/base.adapter.js";

@injectable()
export class ProjectManager {
  constructor(
    @injectProjectAdapters() private readonly adapters: BaseProjectAdapter[],
  ) {}

  getAdapter(adapterType: IProjectAdapterType) {
    const adapter = this.adapters.find(
      (adapter) => adapter.type === adapterType,
    );
    if (!adapter) {
      throw new Error(`Project adapter not found for type ${adapter}`);
    }
    return adapter;
  }
}
