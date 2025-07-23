import { Module } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [ProductServiceService],
  controllers: [ProductServiceController],
})
export class ProductServiceModule {}
