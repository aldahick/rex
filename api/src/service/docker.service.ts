import { injectable } from "@athenajs/core";
import Docker from "dockerode";

import { RexConfig } from "../config.js";

export interface DockerRunParams {
  image: string;
  args: string[];
  volumePaths: {
    container: string;
    host: string;
  }[];
}

@injectable()
export class DockerService {
  constructor(private readonly config: RexConfig) {}

  async run({ image, args, volumePaths }: DockerRunParams): Promise<void> {
    const options: Docker.ContainerCreateOptions = {
      HostConfig: {
        AutoRemove: true,
        Binds: volumePaths.map((v) => `${v.host}:${v.container}`),
      },
      Volumes: Object.fromEntries(volumePaths.map((v) => [v.container, {}])),
    };
    const client = await this.getClient();
    await client.run(image, args, process.stdout, options);
  }

  // normally this would be initialized, but Docker (and its config variables) are optional
  private client?: Docker;
  private async getClient(): Promise<Docker> {
    if (this.client) {
      return this.client;
    }
    const socketPath = this.config.dockerSocketPath;
    const client = new Docker({ socketPath });
    try {
      await client.df();
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "ENOENT") {
        throw new Error("Failed to connect to Docker server: socket not found");
      }
      throw err;
    }
    this.client = client;
    return client;
  }
}
