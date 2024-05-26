import { container } from "@athenajs/core";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RexConfig } from "../../config.js";
import { DockerService } from "./docker.service.js";

const mocks = vi.hoisted(() => ({
  df: vi.fn(),
  run: vi.fn(),
}));

vi.mock("dockerode", () => ({
  default: class {
    df = mocks.df;
    run = mocks.run;
  },
}));

describe("DockerService", () => {
  const service = () => container.resolve(DockerService);
  beforeEach(() => {
    container.reset();
    container.register(RexConfig, {
      useValue: {} as RexConfig,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("run()", () => {
    it("should throw clean error if config is missing", async () => {
      const error = new Error("");
      (error as { code?: string }).code = "ENOENT";
      mocks.df.mockRejectedValue(error);
      const actual = () =>
        service().run({ image: "", args: [], volumePaths: [] });
      await expect(actual).rejects.toThrow(
        new Error("Failed to connect to Docker server: socket not found"),
      );
    });

    it("should throw generic errors unmodified", async () => {
      const error = new Error("generic");
      mocks.df.mockRejectedValue(error);
      const actual = () =>
        service().run({ image: "", args: [], volumePaths: [] });
      await expect(actual).rejects.toThrow(new Error("generic"));
    });

    it("should validate connection before running the container", async () => {
      await service().run({
        image: "image",
        args: ["arg"],
        volumePaths: [{ container: "container", host: "host" }],
      });
      expect(mocks.df).toHaveBeenCalledOnce();
      expect(mocks.run).toHaveBeenLastCalledWith(
        "image",
        ["arg"],
        process.stdout,
        {
          HostConfig: {
            AutoRemove: true,
            Binds: ["host:container"],
          },
          Volumes: {
            container: {},
          },
        },
      );
    });

    it("should use cached client when called repeatedly", async () => {
      const docker = service();
      await docker.run({
        image: "image1",
        args: ["arg1"],
        volumePaths: [{ container: "container1", host: "host1" }],
      });
      await docker.run({
        image: "image2",
        args: ["arg2"],
        volumePaths: [{ container: "container2", host: "host2" }],
      });
      expect(mocks.df).toHaveBeenCalledOnce();
      expect(mocks.run).toHaveBeenCalledTimes(2);
    });
  });
});
