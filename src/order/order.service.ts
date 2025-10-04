import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly userClient: ClientProxy,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    return this.userClient.send('order-create', createOrderDto);
  }
}
