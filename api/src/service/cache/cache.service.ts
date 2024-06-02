import { Logger, injectable } from "@athenajs/core";
import { Redis } from "ioredis";
import { RexConfig } from "../../config.js";

@injectable()
export class CacheService extends Redis {
  constructor(config: RexConfig, logger: Logger) {
    super(config.redisUrl, {
      retryStrategy: (times) => {
        if (times < 5) {
          return 200;
        }
        logger.error("Failed to connect to Redis, stopping server");
        process.exit(1);
      },
    });
  }

  async getOrSet<T>({
    key,
    value,
    expiresIn,
  }: {
    key: string;
    value: () => Promise<T>;
    expiresIn: number;
  }): Promise<T> {
    const cached = await this.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
    const newValue = await value();
    await this.set(key, JSON.stringify(newValue), "EX", expiresIn);
    return newValue;
  }
}
