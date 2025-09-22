import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from 'src/queue/queue.service';

@Controller('products-service')
export class ProductServiceController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async createProduct(@Body() body: any) {
    await this.queueService.addStockJob(body);
    return { message: 'Product creation job queued' };
  }
}
