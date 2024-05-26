import { container } from "@athenajs/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RexConfig } from "../../config.js";

const mocks = vi.hoisted(() => ({
  rakeDb: vi.fn(),
}));
vi.mock("rake-db", () => ({
  rakeDb: mocks.rakeDb,
}));

describe("database migration", () => {
  beforeEach(() => {
    container.reset();
  });
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should export change function", async () => {
    container.reset();
    container.register(RexConfig, {
      useValue: {
        postgresUrl: "postgres url",
      } as RexConfig,
    });
    await import("./database.migration.js");
    expect(mocks.rakeDb.mock.calls[0]?.[0]).toEqual({
      databaseURL: "postgres url",
    });
    const options = mocks.rakeDb.mock.calls[0]?.[1];
    expect(options.import).toBeTypeOf("function");
    await options.import("./src/service/database/database.migration.ts");
  });
});
