import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(
  process.env.REDIS_URL || 'redis://localhost:6379',
  {
    maxRetriesPerRequest: null,
  },
);

const productQueue = new Queue('product-events', { connection });

@Injectable()
export class QueueService {
  async addStockJob(data: any) {
    await productQueue.add('add-stock', data, { attempts: 3 });
  }
}
