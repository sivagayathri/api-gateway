import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'iPhone 15 Pro', description: 'Product name' })
  name?: string;

  @ApiPropertyOptional({ example: 'Apple iPhone 15 Pro 256GB', description: 'Product description' })
  description?: string;

  @ApiPropertyOptional({ example: 'Electronics', description: 'Product category' })
  category?: string;

  @ApiPropertyOptional({ example: 89999, description: 'Product price' })
  price?: number;

  @ApiPropertyOptional({ example: 100, description: 'Stock quantity' })
  stock?: number;
}
