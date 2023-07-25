import { injectable } from "@athenajs/core";
import { JobsClient } from "@google-cloud/run";

import { RexConfig } from "../config.js";

export interface CreateJobParams {
  name: string;
  image: string;
  args: string[];
  env?: { name: string; value: string }[];
}

@injectable()
export class GoogleCloudService {
  constructor(private readonly config: RexConfig) {}

  readonly jobs = new JobsClient({
    projectId: this.config.googleCloud.projectId,
    keyFilename: this.config.googleCloud.credentialsPath,
  });

  /**
   * Jobs are paramless on execution, but for simplicity's sake (avoiding major state management),
   *   we create jobs with params, immediately execute them, and thnen delete the job.
   */
  async createAndRun(params: CreateJobParams): Promise<void> {
    const { name } = params;
    await this.createJob(params);
    await this.runJob(name);
    await this.deleteJob(name);
  }

  private async createJob({
    name,
    image,
    args,
    env = [],
  }: CreateJobParams): Promise<void> {
    console.log("creating job", { name, image, args });
    const [operation] = await this.jobs.createJob({
      job: {
        name,
        template: {
          template: {
            containers: [
              {
                args,
                image,
                env,
              },
            ],
          },
        },
      },
    });
    await operation.promise();
    console.log("created job", name);
  }

  private async runJob(name: string): Promise<void> {
    console.log("running job", name);
    const [operation] = await this.jobs.runJob({ name });
    const [] = await operation.promise();
    console.log("ran job", name);
  }

  private async deleteJob(name: string): Promise<void> {
    console.log("deleting job", name);
    const [operation] = await this.jobs.deleteJob({ name });
    await operation.promise();
    console.log("deleted job", name);
  }
}
