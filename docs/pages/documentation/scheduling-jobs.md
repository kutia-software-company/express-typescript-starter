# Scheduling Jobs

You can schedule jobs easy with [cron-decorators](https://github.com/mrbandler/cron-decorators).

### Enable Cron Jobs

To enable cron jobs you just need to update your env file by set `ENABLE_CRON_JOBS` to `true`.

### Example

```ts
import { CronController, Cron } from "cron-decorators";
import moment from "moment";

// Cron jobs will be mounted under the namespace "jobs".
@CronController("jobs")
export class JobController {
    // Async cron job that runs every second.
    @Cron("sec", "* * * * * *")
    public async secCronJob(): Promise<void> {
        console.log("I am cron Job 'sec' and I just ran!");
    }

    // Cron job that runs every 10 seconds.
    @Cron("10sec", "*/10 * * * * *")
    public tenSecCronJob(): void {
        console.log("I am cron Job '10sec' and I just ran!");
    }

    // Cron job that runs at the 22nd December 2019 at 15:42:00.
    @Cron("date", new Date("December 22, 2019 15:42:00"))
    public dateCronJob(): void {
        console.log("I am cron Job 'date' and I just ran!");
    }

    // Cron job that runs at the 22nd December 2019 at 15:42:00.
    @Cron("moment", moment("2019-12-22 15:42:00"), {
        runOnInit: false,
        timeZone: "Europe/Berlin",
    })
    public momentCronJob(): void {
        console.log("I am cron Job 'moment' and I just ran!");
    }
}
```