import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('example-queue') private readonly queue: Queue) {}

  async addJob(data: any) {
    await this.queue.add('product-create', data, {
      attempts: 3,
      backoff: 5000,
    });
  }
}
