import { Controller, Post, Get, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { QueueService } from 'src/queue/queue.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductServiceController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  async getAllProducts() {
    try {
      return await this.queueService.getAllProducts();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':sku')
  @ApiOperation({ summary: 'Get product by SKU' })
  @ApiParam({ name: 'sku', example: 'IPHONE-15-128', description: 'Product SKU' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductBySku(@Param('sku') sku: string) {
    try {
      return await this.queueService.getProductBySku(sku);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Product with this SKU already exists' })
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.queueService.createProduct(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':sku')
  @ApiOperation({ summary: 'Update a product by SKU' })
  @ApiParam({ name: 'sku', example: 'IPHONE-15-128', description: 'Product SKU' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateProduct(@Param('sku') sku: string, @Body() body: UpdateProductDto) {
    try {
      return await this.queueService.updateProduct(sku, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':sku')
  @ApiOperation({ summary: 'Delete a product by SKU' })
  @ApiParam({ name: 'sku', example: 'IPHONE-15-128', description: 'Product SKU' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('sku') sku: string) {
    try {
      return await this.queueService.deleteProduct(sku);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('queue')
  @ApiOperation({ summary: 'Queue a product creation job (fire-and-forget)' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product creation job queued successfully' })
  async queueProduct(@Body() body: CreateProductDto) {
    await this.queueService.addJob(body);
    return { message: 'Product creation job queued' };
  }
}
