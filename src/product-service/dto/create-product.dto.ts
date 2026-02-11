import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Product name' })
  name: string;

  @ApiProperty({ example: 'IPHONE-15-128', description: 'Unique product SKU' })
  sku: string;

  @ApiProperty({ example: 'Apple iPhone 15 128GB', description: 'Product description' })
  description: string;

  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  category: string;

  @ApiProperty({ example: 79999, description: 'Product price' })
  price: number;

  @ApiProperty({ example: 50, description: 'Stock quantity' })
  stock: number;
}
