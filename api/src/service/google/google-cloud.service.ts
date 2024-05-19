import { injectable } from "@athenajs/core";
import { JobsClient } from "@google-cloud/run";
import { RexConfig } from "../../config.js";

export interface CreateJobParams {
  name: string;
  image: string;
  args: string[];
  env?: { name: string; value: string }[];
}

@injectable()
export class GoogleCloudService {
  readonly jobs;
  constructor(private readonly config: RexConfig) {
    this.jobs = new JobsClient({
      projectId: this.config.googleCloud.projectId,
      keyFilename: this.config.googleCloud.credentialsPath,
    });
  }

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
  }

  private async runJob(name: string): Promise<void> {
    const [operation] = await this.jobs.runJob({ name });
    await operation.promise();
  }

  private async deleteJob(name: string): Promise<void> {
    const [operation] = await this.jobs.deleteJob({ name });
    await operation.promise();
  }
}
