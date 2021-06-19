import { CronController as CronJobClass, Cron } from 'cron-decorators';
import { Service as Injectable } from 'typedi';

@Injectable()
@CronJobClass()
export class ExampleCronJob {
  @Cron('Log every second', '* * * * * *')
  public async handle(): Promise<void> {
    console.log('I am cron Job and I just ran!');
  }
}
