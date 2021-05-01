import { QueueJobBase } from '@base/infrastructure/abstracts/QueueJobBase';
import { Job } from 'bullmq';

export class SendWelcomeMail extends QueueJobBase {
  /**
   * Create a new job instance.
   */
  public constructor(data: any) {
    super(data);
  }

  /**
   * Execute the job.
   */
  public async handle(job: Job) {
    const user = job.data;

    console.log('Recieved job', job.name);
    console.log(user);
  }
}
