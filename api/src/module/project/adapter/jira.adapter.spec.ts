import { container } from "@athenajs/core";
import { beforeAll, describe, expect, it } from "vitest";
import { JiraService } from "../../../service/jira/jira.service.js";
import changelogsByKey from "./fixture/jira-changelogs.fixture.json";
import { jiraStatusDurationsFixture } from "./fixture/jira-durations.fixture.js";
import { JiraProjectAdapter } from "./jira.adapter.js";

describe("JiraProjectAdapter", () => {
  const mockJiraService = {};
  const adapter = () => container.resolve(JiraProjectAdapter);
  beforeAll(() => {
    container.reset();
    container.register(JiraService, {
      useValue: mockJiraService,
    });
  });

  describe("getStatusDurations()", () => {
    it("should aggregate durations correctly", () => {
      for (const [issueKey, expectedDurations] of Object.entries(
        jiraStatusDurationsFixture,
      )) {
        const expected = expectedDurations.map((duration) => {
          const workingMinutes =
            duration.workingDuration ?? duration.fullDuration;
          return {
            ...duration,
            workingDays: Math.floor(workingMinutes / (24 * 60)),
            workingDuration: workingMinutes % (24 * 60),
          };
        });
        const changelog =
          changelogsByKey[issueKey as keyof typeof changelogsByKey];

        const actual = adapter().getStatusDurations(issueKey, changelog);
        for (const expectedDuration of expected) {
          const actualDuration = actual.find(
            (d) =>
              d.status.toLocaleLowerCase() ===
              expectedDuration.status.toLocaleLowerCase(),
          );
          expect(actualDuration).toEqual(expectedDuration);
        }
      }
    });
  });
});
