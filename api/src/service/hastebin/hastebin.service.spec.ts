import axios from "axios";
import {
  MockInstance,
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { HastebinService } from "./hastebin.service.js";

describe("HastebinService", () => {
  const service = new HastebinService();
  let mockPost: MockInstance;
  beforeAll(() => {
    mockPost = vi.spyOn(axios, "post");
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("create()", () => {
    it("should return the created document URL", async () => {
      mockPost.mockResolvedValue({
        data: { key: "some-key" },
      });
      const actual = await service.create("some data");
      expect(actual).toEqual("https://hastebin.com/some-key");
    });
  });
});
