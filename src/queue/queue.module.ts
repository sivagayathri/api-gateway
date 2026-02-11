import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
        const url = new URL(redisUrl);
        return {
          connection: {
            host: url.hostname,
            port: parseInt(url.port) || 6379,
          },
        };
      },
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'product-events',
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
