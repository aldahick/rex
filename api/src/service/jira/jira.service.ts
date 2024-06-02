import { injectable } from "@athenajs/core";
import * as jira from "jira.js";
import { CacheService } from "../cache/cache.service.js";
export type {
  Issue as JiraIssue,
  Sprint as JiraSprint,
  User as JiraUser,
} from "jira.js/out/agile/models/index.js";
export type { Changelog as JiraChangelog } from "jira.js/out/version3/models/index.js";

export interface JiraApiConfig {
  host: string;
  email: string;
  apiToken: string;
}

@injectable()
export class JiraService {
  constructor(private readonly cache: CacheService) {}

  async getBoards(config: JiraApiConfig) {
    const agile = this.getAgileClient(config);
    return await this.cache.getOrSet({
      key: "jira:boards",
      expiresIn: 7 * 24 * 60 * 60,
      value: () =>
        this.fetchPaginated((page) =>
          agile.board.getAllBoards({ ...page, type: "scrum" }),
        ),
    });
  }

  async getSprints(config: JiraApiConfig, boardId: number) {
    const agile = this.getAgileClient(config);
    return await this.cache.getOrSet({
      key: `jira:sprints:${boardId}`,
      expiresIn: 24 * 60 * 60,
      value: () =>
        this.fetchPaginated((page) =>
          agile.board.getAllSprints({ ...page, boardId }),
        ),
    });
  }

  async getIssues(config: JiraApiConfig, sprintId: number) {
    const agile = this.getAgileClient(config);
    return await this.cache.getOrSet({
      key: `jira:issues:${sprintId}`,
      expiresIn: 4 * 60 * 60,
      value: () =>
        this.fetchPaginated<jira.Agile.AgileModels.Issue>((page) =>
          agile.sprint.getIssuesForSprint({
            ...page,
            sprintId,
            expand: "changelog",
          }),
        ),
    });
  }

  async getIssueChangelog(config: JiraApiConfig, issueKey: string) {
    const jira = this.getJiraClient(config);
    return await this.cache.getOrSet({
      key: `jira:issueChangelog:${issueKey}`,
      expiresIn: 30 * 60,
      value: () =>
        this.fetchPaginated((page) =>
          jira.issues.getChangeLogs({ ...page, issueIdOrKey: issueKey }),
        ),
    });
  }

  async getIssueFields(config: JiraApiConfig) {
    const jira = this.getJiraClient(config);
    return await this.cache.getOrSet({
      key: "jira:issueFields",
      expiresIn: 24 * 60 * 60,
      value: () => jira.issueFields.getFields(),
    });
  }

  private async fetchPaginated<T>(
    fetch: (pagination: { startAt?: number }) => Promise<
      | jira.Paginated<T>
      | jira.Agile.AgileModels.GetAllBoards
      | jira.Agile.AgileModels.SearchResults
      | jira.Version3.Version3Models.PageChangelog
    >,
  ): Promise<T[]> {
    const results: T[] = [];
    let nextStart = 0;
    do {
      const response = await fetch({ startAt: nextStart });
      const values = "issues" in response ? response.issues : response.values;
      if (values) {
        results.push(...(values as T[]));
        nextStart += values.length;
      }
      if (
        typeof response.maxResults !== "number" ||
        !values ||
        response.maxResults > values.length
      ) {
        nextStart = -1;
      }
    } while (nextStart > 0);
    return results;
  }

  private getAgileClient(config: JiraApiConfig) {
    return new jira.AgileClient(this.getClientConfig(config));
  }

  private getJiraClient(config: JiraApiConfig) {
    return new jira.Version3Client(this.getClientConfig(config));
  }

  private getClientConfig({
    host,
    email,
    apiToken,
  }: JiraApiConfig): jira.Config {
    return {
      host,
      authentication: {
        basic: { email, apiToken },
      },
    };
  }
}
