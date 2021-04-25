import { Job, Queue, Worker, Processor } from 'bullmq';

export abstract class QueueJobBase {
  private queue: Queue;
  abstract readonly jobName: string = QueueJobBase.name;
  private data: any;

  abstract handle(job: any): Promise<Processor<any, any, string>> | any;

  public constructor(data: any) {
    this.data = data;
  }

  public process() {
    this.queue = new Queue(this.jobName);
    this.queue.add(this.jobName, this.data);
    const worker = new Worker(this.jobName, this.handle);

    worker.on('completed', this.onCompleted);
    worker.on('failed', this.onFailed);
  }

  public onCompleted(job: any): any {
    //
  }

  public onFailed(job: any): any {
    //
  }
}
