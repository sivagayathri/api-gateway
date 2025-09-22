import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'nokia-3310',
    description:
      'The SKU (Stock Keeping Unit) or unique identifier for the product',
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    example: 'Nokia 3310',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A durable feature phone with long battery life',
    description: 'Detailed description of the product',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'phones',
    description: 'Category of the product',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 23,
    description: 'Price of the product in USD',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Available stock quantity for the product',
  })
  @IsInt()
  @IsNotEmpty()
  stock: number;
}
