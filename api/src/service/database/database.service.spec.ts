import { container } from "@athenajs/core";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { RexConfig } from "../../config.js";
import { DatabaseService } from "./database.service.js";

const mocks = vi.hoisted(() => ({
  orchidORM: vi.fn(),
  config: vi.fn(),
}));
vi.mock("orchid-orm", () => ({
  orchidORM: mocks.orchidORM,
  createBaseTable: () => class {},
}));

describe("DatabaseService", () => {
  const service = () => container.resolve(DatabaseService);
  beforeAll(() => {
    container.reset();
    container.register(RexConfig, {
      useFactory: mocks.config,
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("constructor()", () => {
    it("should construct ORM client", () => {
      mocks.config.mockReturnValue({
        postgresUrl: "postgres url",
        log: {
          database: true,
        },
      });
      mocks.orchidORM.mockReturnValue({});
      service();
      expect(mocks.orchidORM.mock.calls[0]?.[0]).toEqual({
        databaseURL: "postgres url",
        log: true,
      });
    });
  });
});
