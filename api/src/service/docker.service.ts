import { injectable } from "@athenajs/core";
import Docker from "dockerode";

import { RexConfig } from "../config.js";

@injectable()
export class DockerService {
  constructor(private readonly config: RexConfig) {}

  async run(image: string, args: string[]): Promise<void> {
    const docker = new Docker({ socketPath: this.config.dockerSocketPath });
    await docker.run(image, args, process.stdout, {
      HostConfig: {
        AutoRemove: true,
      },
    });
  }
}
