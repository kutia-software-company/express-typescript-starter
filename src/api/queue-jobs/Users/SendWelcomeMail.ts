import { QueueJobBase } from '@base/abstracts/QueueJobBase';
import { Job } from 'bullmq';

export class SendWelcomeMail extends QueueJobBase {
  readonly jobName = 'SendWelcomeMail';

  public constructor(data: any) {
    super(data);
  }

  /**
   * Execute the job.
   */
  public async handle(job: Job) {
    const user = job.data;

    console.log(user);
  }
}
