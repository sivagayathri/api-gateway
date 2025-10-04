import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty({
    example: '64fb8baf2c7f4c1d88e4eaf2',
    description: 'ID of the product being ordered',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 499.99,
    description: 'Price of the product at purchase time',
  })
  @IsNumber()
  priceAtPurchase: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: '64fb8baf2c7f4c1d88e4eaf1',
    description: 'User ID placing the order',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    type: [OrderItemDto],
    description: 'List of items in the order',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    example: 999.98,
    description: 'Total amount for the order',
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    example: 'UPI',
    description: 'Payment method used',
    enum: ['CARD', 'UPI', 'COD'],
  })
  @IsEnum(['CARD', 'UPI', 'COD'])
  paymentMethod: string;

  @ApiProperty({
    example: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    description: 'Shipping address for the order',
  })
  @IsOptional()
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}
