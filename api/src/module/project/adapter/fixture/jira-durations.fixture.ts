import changelogsByKey from "./jira-changelogs.fixture.json";

const toMinutes = (days: number, hours: number, minutes: number) =>
  (days * 24 + hours) * 60 + minutes;

type StatusDurationCase = {
  status: StatusLabel;
  fullDuration: number;
  workingDuration?: number;
};
type AllCases = Partial<
  Record<keyof typeof changelogsByKey, StatusDurationCase[]>
>;

enum StatusLabel {
  NeedsQA = "Needs QA",
  InQA = "In QA",
  Queued = "Queued",
  InReview = "In Review",
  NeedsProdCheck = "Needs Prod Check",
  CheckingInProd = "Checking in Prod",
  NeedsReview = "Needs review",
  Reopened = "Reopened",
  ReadyToDeploy = "Ready to deploy",
  InProgress = "In Progress",
  NeedsRework = "Needs Rework",
}

export const jiraStatusDurationsFixture: AllCases = {
  "PROJ-0": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(2, 1, 59),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 0,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: 13,
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(0, 3, 10),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(0, 22, 52),
      workingDuration: toMinutes(0, 12, 52),
    },
  ],
  "PROJ-1": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(5, 12, 53),
      workingDuration: toMinutes(3, 2, 53),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 39,
    },
    {
      status: StatusLabel.NeedsProdCheck,
      fullDuration: toMinutes(7, 1, 39),
      workingDuration: toMinutes(5, 1, 39),
    },
    {
      status: StatusLabel.CheckingInProd,
      fullDuration: toMinutes(0, 2, 47),
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(4, 3, 58),
      workingDuration: toMinutes(1, 7, 58),
    },
    {
      status: StatusLabel.Reopened,
      fullDuration: toMinutes(4, 22, 16),
      workingDuration: toMinutes(2, 12, 16),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(15, 2, 41),
      workingDuration: toMinutes(11, 2, 41),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(6, 17, 23),
      workingDuration: toMinutes(7, 3, 23),
    },
  ],
  "PROJ-2": [
    {
      status: StatusLabel.Queued,
      fullDuration: 0,
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 0,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 1, 7),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(1, 23, 7),
      workingDuration: toMinutes(0, 8, 39),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: 26,
    },
  ],
  "PROJ-3": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(23, 20, 53),
      workingDuration: toMinutes(17, 10, 53),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 17,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 1, 23),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(0, 5, 21),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(1, 0, 14),
      workingDuration: toMinutes(1, 0, 15),
    },
  ],
  "PROJ-4": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(0, 23, 9),
      workingDuration: toMinutes(0, 13, 9),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 0,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: 0,
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(2, 0, 27),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(2, 23, 47),
      workingDuration: toMinutes(0, 13, 47),
    },
  ],
  "PROJ-5": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(1, 17, 9),
      workingDuration: toMinutes(1, 7, 9),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 1,
    },
    {
      status: StatusLabel.NeedsProdCheck,
      fullDuration: toMinutes(0, 1, 25),
    },
    {
      status: StatusLabel.CheckingInProd,
      fullDuration: toMinutes(0, 2, 38),
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 1, 50),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(4, 23, 56),
      workingDuration: toMinutes(2, 13, 56),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(0, 1, 38),
    },
  ],
  "PROJ-6": [
    {
      status: StatusLabel.NeedsQA,
      fullDuration: toMinutes(0, 3, 29),
    },
    {
      status: StatusLabel.InQA,
      fullDuration: 0,
    },
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(16, 3, 12),
      workingDuration: toMinutes(12, 3, 12),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: toMinutes(0, 1, 43),
    },
    {
      status: StatusLabel.NeedsProdCheck,
      fullDuration: toMinutes(1, 0, 22),
      workingDuration: toMinutes(1, 6, 33),
    },
    {
      status: StatusLabel.CheckingInProd,
      fullDuration: toMinutes(0, 13, 57),
      workingDuration: toMinutes(0, 7, 46),
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(4, 18, 3),
      workingDuration: toMinutes(2, 8, 3),
    },
    {
      status: StatusLabel.Reopened,
      fullDuration: toMinutes(4, 22, 39),
      workingDuration: toMinutes(2, 12, 39),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(4, 8, 11),
      workingDuration: toMinutes(3, 12, 11),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(10, 2, 25),
      workingDuration: toMinutes(6, 2, 25),
    },
    {
      status: StatusLabel.NeedsRework,
      fullDuration: toMinutes(0, 21, 31),
      workingDuration: toMinutes(0, 11, 31),
    },
  ],
  "PROJ-7": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(3, 1, 16),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 20,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 23, 29),
      workingDuration: toMinutes(0, 5, 12),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(1, 3, 57),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(5, 14, 38),
      workingDuration: toMinutes(3, 12, 56),
    },
    {
      status: StatusLabel.NeedsRework,
      fullDuration: toMinutes(0, 3, 47),
    },
  ],
  "PROJ-8": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(2, 15, 19),
      workingDuration: toMinutes(2, 5, 19),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 14,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 19, 34),
      workingDuration: toMinutes(0, 9, 34),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(0, 1, 31),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(4, 6, 38),
      workingDuration: toMinutes(2, 6, 38),
    },
  ],
  "PROJ-9": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(8, 11, 49),
      workingDuration: toMinutes(4, 7, 45),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 18,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 12, 38),
      workingDuration: toMinutes(0, 2, 38),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(0, 6, 50),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(4, 23, 55),
      workingDuration: toMinutes(5, 3, 59),
    },
  ],
  "PROJ-10": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(0, 2, 23),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: toMinutes(0, 1, 26),
    },
    {
      status: StatusLabel.NeedsProdCheck,
      fullDuration: toMinutes(1, 19, 27),
      workingDuration: toMinutes(1, 9, 27),
    },
    {
      status: StatusLabel.CheckingInProd,
      fullDuration: toMinutes(0, 0, 14),
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 18, 25),
      workingDuration: toMinutes(0, 8, 25),
    },
    {
      status: StatusLabel.Reopened,
      fullDuration: toMinutes(0, 12, 10),
      workingDuration: toMinutes(0, 6, 14),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(1, 6, 40),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(7, 9, 40),
      workingDuration: toMinutes(3, 5, 36),
    },
  ],
  "PROJ-11": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(15, 17, 54),
      workingDuration: toMinutes(11, 7, 54),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 1,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 15, 50),
      workingDuration: toMinutes(0, 5, 50),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(5, 2, 34),
      workingDuration: toMinutes(3, 2, 34),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(1, 8, 24),
    },
  ],
  "PROJ-12": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(7, 0, 54),
      workingDuration: toMinutes(5, 0, 54),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 6,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: 12,
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(1, 0, 13),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(5, 22, 30),
      workingDuration: toMinutes(3, 12, 30),
    },
  ],
  "PROJ-13": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(5, 3, 37),
      workingDuration: toMinutes(3, 3, 37),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 4,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: 14,
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(1, 16, 14),
      workingDuration: toMinutes(1, 6, 15),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(2, 4, 42),
    },
  ],
  "PROJ-14": [
    {
      status: StatusLabel.Queued,
      fullDuration: toMinutes(8, 17, 30),
      workingDuration: toMinutes(6, 7, 30),
    },
    {
      status: StatusLabel.InReview,
      fullDuration: 1,
    },
    {
      status: StatusLabel.NeedsReview,
      fullDuration: toMinutes(0, 5, 9),
    },
    {
      status: StatusLabel.ReadyToDeploy,
      fullDuration: toMinutes(0, 14, 59),
      workingDuration: toMinutes(0, 4, 59),
    },
    {
      status: StatusLabel.InProgress,
      fullDuration: toMinutes(0, 4, 59),
    },
  ],
};
