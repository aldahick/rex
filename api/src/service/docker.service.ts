import { injectable } from "@athenajs/core";
import Docker from "dockerode";

import { RexConfig } from "../config.js";

@injectable()
export class DockerService {
  constructor(private readonly config: RexConfig) {}

  async run(image: string, args: string[]): Promise<void> {
    const socketPath = this.config.dockerSocketPath;
    try {
      const docker = new Docker({ socketPath });
      await docker.run(image, args, process.stdout, {
        HostConfig: {
          AutoRemove: true,
        },
      });
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === `connect ENOENT ${socketPath}`
      ) {
        throw new Error("Failed to connect to Docker server: socket not found");
      }
      throw err;
    }
  }
}
