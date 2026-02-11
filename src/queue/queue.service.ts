import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents } from 'bullmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueService {
  private queueEvents: QueueEvents;

  constructor(
    @InjectQueue('product-events') private readonly queue: Queue,
    private configService: ConfigService,
  ) {
    const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    const url = new URL(redisUrl);
    this.queueEvents = new QueueEvents('product-events', {
      connection: {
        host: url.hostname,
        port: parseInt(url.port) || 6379,
      },
    });
  }

  // Fire-and-forget: Queue product creation
  async addJob(data: any) {
    await this.queue.add('add-stock', data, {
      attempts: 3,
      backoff: 5000,
    });
  }

  // Request-Response: Wait for job result
  async addJobAndWait(jobName: string, data: any): Promise<any> {
    const job = await this.queue.add(jobName, data, {
      attempts: 3,
      backoff: 5000,
    });
    const result = await job.waitUntilFinished(this.queueEvents, 30000);
    return result;
  }

  // Get all products
  async getAllProducts(): Promise<any> {
    return this.addJobAndWait('get-all-products', {});
  }

  // Get product by SKU
  async getProductBySku(sku: string): Promise<any> {
    return this.addJobAndWait('get-product-by-sku', { sku });
  }

  // Create product (sync - returns created product)
  async createProduct(data: any): Promise<any> {
    return this.addJobAndWait('create-product', data);
  }

  // Update product
  async updateProduct(sku: string, data: any): Promise<any> {
    return this.addJobAndWait('update-product', { sku, ...data });
  }

  // Delete product
  async deleteProduct(sku: string): Promise<any> {
    return this.addJobAndWait('delete-product', { sku });
  }
}
