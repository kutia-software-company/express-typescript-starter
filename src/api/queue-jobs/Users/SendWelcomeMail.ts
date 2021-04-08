import { QueueJobBase } from '../../../abstracts/QueueJobBase'

export class SendWelcomeMail extends QueueJobBase {
    readonly jobName = 'SendWelcomeMail'

    public constructor(data: any) {
        super(data)
    }

    /**
     * Execute the job.
     */
    public async handle(job: any) {
        const user = job.data

        console.log(user)
    }
}