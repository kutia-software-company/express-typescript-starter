import { CronController as CronJobClass, Cron } from 'cron-decorators';
import { Service as Injectable } from 'typedi';

@Injectable()
@CronJobClass('example-cron-job')
export class ExampleCronJob {
  // Async cron job that runs every second.
  @Cron('Log every second', '* * * * * *')
  public async secCronJob(): Promise<void> {
    console.log('I am cron Job and I just ran!');
  }

  // Cron job that runs every 10 seconds.
  @Cron('Log every 10 seconds', '*/10 * * * * *')
  public tenSecCronJob(): void {
    console.log('I am cron Job and I just ran!');
  }

  // Cron job that runs at the 22nd December 2025 at 15:42:00.
  @Cron('Log on specifc date', new Date('December 22, 2025 15:42:00'))
  public dateCronJob(): void {
    console.log('I am cron Job and I just ran!');
  }
}
