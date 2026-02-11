import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductServiceModule } from './product-service/product-service.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const redisUrl = configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
          const url = new URL(redisUrl);
          return {
            transport: Transport.REDIS,
            options: {
              host: url.hostname,
              port: parseInt(url.port) || 6379,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    UserModule,
    ProductServiceModule,
    QueueModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
