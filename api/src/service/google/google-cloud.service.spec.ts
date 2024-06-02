import { container } from "@athenajs/core";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { RexConfig } from "../../config.js";
import { GoogleCloudService } from "./google-cloud.service.js";

const mocks = vi.hoisted(() => ({
  createJob: vi.fn(),
  runJob: vi.fn(),
  deleteJob: vi.fn(),
}));

vi.mock("@google-cloud/run", () => ({
  JobsClient: class {
    createJob = mocks.createJob;
    runJob = mocks.runJob;
    deleteJob = mocks.deleteJob;
  },
}));

describe("GoogleCloudService", () => {
  const service = () => container.resolve(GoogleCloudService);
  beforeAll(() => {
    container.reset();
    container.register(RexConfig, {
      useValue: {
        google: {
          cloud: {},
        },
      } as RexConfig,
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("createAndRun()", () => {
    it("should create, run, and delete a job", async () => {
      mocks.createJob.mockResolvedValue([{ promise: () => {} }]);
      mocks.deleteJob.mockResolvedValue([{ promise: () => {} }]);
      mocks.runJob.mockResolvedValue([{ promise: () => {} }]);
      await service().createAndRun({
        name: "name",
        image: "image",
        args: ["arg 1", "arg 2"],
        env: [{ name: "env 1", value: "value 1" }],
      });
      expect(mocks.createJob).toHaveBeenLastCalledWith({
        job: {
          name: "name",
          template: {
            template: {
              containers: [
                {
                  args: ["arg 1", "arg 2"],
                  image: "image",
                  env: [{ name: "env 1", value: "value 1" }],
                },
              ],
            },
          },
        },
      });
      expect(mocks.runJob).toHaveBeenLastCalledWith({
        name: "name",
      });
      expect(mocks.deleteJob).toHaveBeenLastCalledWith({
        name: "name",
      });
    });
  });
});
