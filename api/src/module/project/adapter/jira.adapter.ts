import { differenceInMilliseconds, eachHourOfInterval } from "date-fns";
import { filter, isTruthy, sortBy } from "remeda";
import {
  IProjectAdapterType,
  IProjectBoard,
  IProjectConfig,
  IProjectIssue,
  IProjectIssueStatusDuration,
  IProjectIssuesArgs,
  IProjectSprint,
  IProjectSprintsArgs,
} from "../../../graphql.js";
import {
  JiraChangelog,
  JiraIssue,
  JiraService,
  JiraSprint,
  JiraUser,
} from "../../../service/jira/jira.service.js";
import { BaseProjectAdapter, projectAdapter } from "./base.adapter.js";

const isWorkingHour = (hour: Date) =>
  (hour.getUTCDay() >= 1 &&
    hour.getUTCDay() <= 5 &&
    hour.getUTCHours() >= 11) ||
  (hour.getUTCDay() >= 2 && hour.getUTCDay() <= 6 && hour.getUTCHours() === 0);

@projectAdapter()
export class JiraProjectAdapter implements BaseProjectAdapter {
  readonly type = IProjectAdapterType.Jira;

  constructor(private readonly jira: JiraService) {}

  async getBoards(config: IProjectConfig): Promise<IProjectBoard[]> {
    const boards = await this.jira.getBoards(config);
    return boards.map((board) => ({
      id: board.id ?? -1,
      name: board.location?.displayName ?? "",
    }));
  }

  async getSprints(
    config: IProjectConfig,
    { boardId }: IProjectSprintsArgs,
  ): Promise<IProjectSprint[]> {
    const sprints = await this.jira.getSprints(config, boardId);
    return sprints.map((s) => this.sprintToGql(s));
  }

  async getIssues(
    config: IProjectConfig,
    { sprintId }: IProjectIssuesArgs,
  ): Promise<IProjectIssue[]> {
    const [issues, fields] = await Promise.all([
      this.jira.getIssues(config, sprintId),
      this.jira.getIssueFields(config),
    ]);

    const sprintsField = fields.find((f) => f.name === "Sprint");
    const storyPointsField = fields.find((f) => f.name === "Story Points");
    const techImplementerField = fields.find(
      (f) => f.name === "Tech Implementer",
    );

    const issueToGql = async (issue: JiraIssue): Promise<IProjectIssue> => {
      console.log(issue.fields?.timespent);
      const storyPoints: number | undefined =
        issue.fields?.[storyPointsField?.id ?? ""];
      const sprints: JiraSprint[] = issue.fields?.[sprintsField?.id ?? ""];
      const techImplementer: JiraUser =
        issue.fields?.[techImplementerField?.id ?? ""];
      if (
        issue.changelog &&
        issue.changelog.maxResults === issue.changelog.histories?.length
      ) {
        issue.changelog.histories = await this.jira.getIssueChangelog(
          config,
          issue.key ?? "",
        );
      }
      return {
        id: issue.id ?? "",
        key: issue.key ?? "",
        type: issue.fields?.issuetype.name ?? "",
        state: issue.fields?.status.name ?? "",
        title: issue.fields?.summary ?? "",
        sprints: sprints.map((s) => this.sprintToGql(s)),
        storyPoints,
        statusDurations: this.getStatusDurations(
          issue.key ?? "",
          issue.changelog?.histories ?? [],
        ),
        implementer: {
          id: techImplementer.accountId,
          name: techImplementer.displayName,
          email: techImplementer.emailAddress,
        },
      };
    };

    const gqlIssues: IProjectIssue[] = [];
    for (const issue of issues) {
      gqlIssues.push(await issueToGql(issue));
    }
    return gqlIssues;
  }

  getStatusDurations(
    key: string,
    changelog: JiraChangelog[],
  ): IProjectIssueStatusDuration[] {
    const statusEntries = filter(
      sortBy(changelog, (c) => c.created ?? "").map((entry) => {
        const [statusItem, ...extraStatusItems] =
          entry.items?.filter((i) => i.field === "status") ?? [];
        if (extraStatusItems.length > 1) {
          throw new Error(
            `Encountered changelog entry for "${key}" with multiple status changes: ${JSON.stringify(
              entry,
            )}`,
          );
        }
        if (statusItem?.fromString && statusItem.toString && entry.created) {
          return {
            created: new Date(entry.created),
            from: statusItem.fromString,
            to: statusItem.toString,
          };
        }
      }),
      isTruthy,
    );

    const statusTimes: Record<string, { start: Date; end?: Date }[]> = {};
    const updateLastStatusTime = (
      entry: (typeof statusEntries)[number],
      key: "from" | "to",
    ) => {
      const times = statusTimes[entry[key]];
      const lastTime = times?.[times?.length - 1];
      if (lastTime) {
        if (key === "from") {
          lastTime.end = entry.created;
        } else {
          times.push({ start: entry.created });
        }
      } else if (key === "to") {
        statusTimes[entry[key]] = [{ start: entry.created }];
      }
      // if key is "from", this is the initial transition and we don't care how long the issue was in the initial status
    };
    for (const entry of statusEntries) {
      updateLastStatusTime(entry, "from");
      updateLastStatusTime(entry, "to");
    }

    return Object.entries(statusTimes).map(([status, originalTimes]) => {
      const times = originalTimes.map(({ start, end }) => ({
        start,
        end: end ?? new Date(),
      }));
      const statusDuration: IProjectIssueStatusDuration = {
        status,
        fullDuration: 0,
        workingDays: 0,
        workingDuration: 0,
      };
      for (const { end, start } of times) {
        statusDuration.fullDuration +=
          differenceInMilliseconds(end, start) / 60_000;
        const workingHours = eachHourOfInterval({ end, start }).filter((hour) =>
          isWorkingHour(hour),
        );
        // statusDuration.workingDays += Math.floor(workingHours.length / 14);
        statusDuration.workingDuration += workingHours.length * 60;
        statusDuration.workingDuration -= isWorkingHour(start)
          ? start.getUTCMinutes() + start.getUTCSeconds() / 60
          : 0;
        statusDuration.workingDuration -= isWorkingHour(end)
          ? 60 - (end.getUTCMinutes() + end.getUTCSeconds() / 60)
          : 0;
      }
      statusDuration.fullDuration = Math.floor(statusDuration.fullDuration);
      statusDuration.workingDays = Math.floor(
        statusDuration.workingDuration / 14 / 60,
      );
      statusDuration.workingDuration = Math.floor(
        ((statusDuration.workingDuration / 60) % 14) * 60,
      );
      return statusDuration;
    });
  }

  private sprintToGql(sprint: JiraSprint): IProjectSprint {
    return {
      id: sprint.id,
      name: sprint.name,
      state: sprint.state,
      start: sprint.startDate ? new Date(sprint.startDate) : undefined,
      end: sprint.endDate ? new Date(sprint.endDate) : undefined,
    };
  }
}
