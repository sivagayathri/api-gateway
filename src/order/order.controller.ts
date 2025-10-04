import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Order successfully created',
  })
  @ApiBody({ type: CreateOrderDto })
  async createProduct(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }
}
