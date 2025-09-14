import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductServiceModule } from './product-service/product-service.module';
import { QueueModule } from './queue/queue.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    UserModule,
    ProductServiceModule,
    QueueModule,
    AdminModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
