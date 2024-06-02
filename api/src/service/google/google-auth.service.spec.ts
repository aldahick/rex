import { container } from "@athenajs/core";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RexConfig } from "../../config.js";
import { GoogleAuthService } from "./google-auth.service.js";

const mocks = vi.hoisted(() => ({
  verifyIdToken: vi.fn(),
}));
vi.mock("google-auth-library", () => ({
  OAuth2Client: class {
    verifyIdToken = mocks.verifyIdToken;
  },
}));

describe("GoogleAuthService", () => {
  const mockConfig = vi.fn();
  const service = () => container.resolve(GoogleAuthService);
  beforeAll(() => {
    container.reset();
    container.register(RexConfig, { useFactory: mockConfig });
  });

  beforeEach(() => {
    mockConfig.mockReturnValue({
      google: {
        oauth: {
          web: {
            clientId: "id",
            clientSecret: "secret",
          },
        },
      },
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe("getIdTokenPayload()", () => {
    it("should throw if credentials are missing", async () => {
      mockConfig.mockReturnValue({
        google: { oauth: { web: { clientId: undefined, clientSecret: "" } } },
      });
      const actual = () => service().getIdTokenPayload("", "web");
      await expect(actual).rejects.toThrow(
        new Error("Missing Google credentials for client web"),
      );
    });

    it("should return undefined if ticket has no user ID", async () => {
      mocks.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: "email" }),
        getUserId: () => null,
      });
      const actual = await service().getIdTokenPayload("", "web");
      expect(actual).toEqual(undefined);
    });

    it("should return undefined if ticket has no user email", async () => {
      mocks.verifyIdToken.mockResolvedValue({
        getPayload: () => undefined,
        getUserId: () => "user id",
      });
      const actual = await service().getIdTokenPayload("", "web");
      expect(actual).toEqual(undefined);
    });

    it("should return user info if ticket has ID and email", async () => {
      mocks.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: "test@gmail.com", hd: undefined }),
        getUserId: () => "user id",
      });
      const actual = await service().getIdTokenPayload("", "web");
      expect(actual).toEqual({
        domain: "gmail.com",
        email: "test@gmail.com",
        userId: "user id",
      });
    });

    it("should return enterprise domain if ticket contains hd", async () => {
      mocks.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: "test@ahicks.dev", hd: "alexhicks.net" }),
        getUserId: () => "user id",
      });
      const actual = await service().getIdTokenPayload("", "web");
      expect(actual).toEqual({
        domain: "alexhicks.net",
        email: "test@ahicks.dev",
        userId: "user id",
      });
    });
  });
});
