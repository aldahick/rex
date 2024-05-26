import { EventEmitter } from "node:events";
import { setTimeout } from "node:timers/promises";
import { Logger, container } from "@athenajs/core";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RexConfig } from "../../config.js";
import {
  DiscordCommand,
  DiscordService,
  discordCommand,
} from "./discord.service.js";

const mocks = vi.hoisted(() => ({
  config: vi.fn(),
  client: {
    login: vi.fn(),
    destroy: vi.fn(),
  },
  commands: {
    single: vi.fn(),
    multiple: vi.fn(),
  },
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock("discord.js", () => ({
  Client: class extends EventEmitter {
    login = mocks.client.login;
    destroy = mocks.client.destroy;
  },
  GatewayIntentBits: {},
}));

describe("DiscordService", () => {
  const service = () => container.resolve(DiscordService);

  beforeAll(() => {
    container.reset();
    container.register(RexConfig, {
      useFactory: mocks.config,
    });
    container.register(Logger, {
      useValue: mocks.logger as unknown as Logger,
    });
    @discordCommand()
    class SingleCommand implements DiscordCommand {
      command = "single";
      helpText = "single help";
      handle = mocks.commands.single;
    }

    @discordCommand()
    class MultipleCommand implements DiscordCommand {
      command = ["multiple1", "multiple2"];
      helpText = "multiple help";
      handle = mocks.commands.multiple;
    }
  });

  beforeEach(() => {
    mocks.config.mockReturnValue({
      discord: { commandPrefix: "~", token: "token" },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("init()", () => {
    it("should log an error if constructor init fails", async () => {
      mocks.client.login.mockRejectedValue(new Error("login failed"));
      service();
      await setTimeout(100);
      expect(mocks.logger.error).toHaveBeenLastCalledWith(
        "failed to start Discord bot: login failed",
      );
    });

    it("should do nothing if Discord token is not configured", async () => {
      mocks.config.mockReturnValue({ discord: {} });
      const discord = service();
      await discord.init();
      expect(discord.client.eventNames()).toEqual([]);
      expect(mocks.client.login).not.toHaveBeenCalled();
    });

    it("should register message handler and log in", async () => {
      const discord = service();
      await discord.init();
      expect(discord.client.eventNames()).toEqual(["message"]);
      expect(mocks.client.login).toHaveBeenLastCalledWith("token");
    });
  });

  describe("close()", () => {
    it("should do nothing if Discord token is not configured", async () => {
      mocks.config.mockReturnValue({ discord: {} });
      const discord = service();
      await discord.init();
      await discord.close();
      expect(mocks.client.destroy).not.toHaveBeenCalled();
    });

    it("should destroy client", async () => {
      const discord = service();
      await discord.init();
      await discord.close();
      expect(mocks.client.destroy).toHaveBeenCalledOnce();
    });
  });

  describe("on(message)", () => {
    it("should do nothing if message does not start with command prefix", async () => {
      const discord = service();
      await discord.init();
      discord.client.emit("message", {
        content: "test",
      });
      expect(mocks.commands.single).not.toHaveBeenCalled();
      expect(mocks.commands.multiple).not.toHaveBeenCalled();
    });

    it("should do nothing if message author is a bot", async () => {
      const discord = service();
      await discord.init();
      discord.client.emit("message", {
        content: "~single",
        author: { bot: true },
      });
      expect(mocks.commands.single).not.toHaveBeenCalled();
      expect(mocks.commands.multiple).not.toHaveBeenCalled();
    });

    it("should do nothing if no command matches", async () => {
      const discord = service();
      await discord.init();
      discord.client.emit("message", {
        content: "~test",
        author: {},
      });
      expect(mocks.commands.single).not.toHaveBeenCalled();
      expect(mocks.commands.multiple).not.toHaveBeenCalled();
    });

    it("should call handler for a matching command", async () => {
      mocks.commands.single.mockResolvedValue(undefined);
      const message = {
        content: "~single with args",
        author: {},
        reply: vi.fn(),
      };
      const discord = service();
      await discord.init();
      discord.client.emit("message", message);
      expect(message.reply).not.toHaveBeenCalled();
      expect(mocks.commands.single).toHaveBeenLastCalledWith(
        message,
        ["with", "args"],
        "single",
      );
      expect(mocks.commands.multiple).not.toHaveBeenCalled();
    });

    it("should reply with response from handler", async () => {
      mocks.commands.single.mockResolvedValue("reply");
      const message = {
        content: "~single with args",
        author: {},
        reply: vi.fn(),
      };
      const discord = service();
      await discord.init();
      discord.client.emit("message", message);
      await setTimeout(100);
      expect(message.reply).toHaveBeenLastCalledWith("reply");
      expect(mocks.commands.single).toHaveBeenLastCalledWith(
        message,
        ["with", "args"],
        "single",
      );
      expect(mocks.commands.multiple).not.toHaveBeenCalled();
    });

    it("should reply with vague error when handler throws", async () => {
      mocks.commands.single.mockRejectedValue(new Error("handler failed"));
      const message = {
        content: "~single with args",
        author: {},
        reply: vi.fn(),
      };
      const discord = service();
      await discord.init();
      discord.client.emit("message", message);
      await setTimeout(100);
      expect(mocks.logger.error).toHaveBeenLastCalledWith(
        "uncaught error in discord command single: handler failed",
      );
      expect(message.reply).toHaveBeenLastCalledWith(
        "sorry, an internal error occurred",
      );
      expect(mocks.commands.single).toHaveBeenLastCalledWith(
        message,
        ["with", "args"],
        "single",
      );
      expect(mocks.commands.multiple).not.toHaveBeenCalled();
    });
  });
});
