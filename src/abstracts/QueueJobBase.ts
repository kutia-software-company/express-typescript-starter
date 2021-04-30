import { Queue, Worker, Processor, QueueScheduler, QueueEvents, JobsOptions } from 'bullmq';

export abstract class QueueJobBase {
  private queue: Queue;
  private queueScheduler: QueueScheduler;
  private queueEvents: QueueEvents;
  private readonly jobName: string = (<any>this).constructor.name;
  private jobOptions: JobsOptions;
  private data: any;

  abstract handle(job: any): Promise<Processor<any, any, string>> | any;

  public constructor(data: any) {
    this.data = data;
  }

  public process() {
    this.queue = new Queue(this.jobName);
    this.queueScheduler = new QueueScheduler(this.jobName);
    this.queueEvents = new QueueEvents(this.jobName);

    this.queue.add(this.jobName, this.data, this.jobOptions);
    const worker = new Worker(this.jobName, this.handle);

    worker.on('completed', this.onCompleted);
    worker.on('failed', this.onFailed);
  }

  public setOptions(jobOptions: JobsOptions): this {
    this.jobOptions = jobOptions;

    return this;
  }

  public dispatch() {
    this.process();
  }

  public onCompleted(job: any): any {
    //
  }

  public onFailed(job: any): any {
    //
  }
}
