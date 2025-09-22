import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminSignIn, CreateAdminDto } from './dto/create-admin.dto';

import { ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-admin-product.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'admin successfully created',
    type: CreateAdminDto,
  })
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'admin successfully logged in',
    type: AdminSignIn,
  })
  async loginAdmin(@Body() loginAdminDto: AdminSignIn) {
    return this.adminService.loginAdmin(loginAdminDto);
  }

  @Post('add-stock')
  @ApiResponse({
    status: 201,
    description: 'admin successfully added products',
    type: CreateProductDto,
  })
  async addStock(@Body() productDetails: CreateProductDto[]) {
    return this.adminService.productDetails(productDetails);
  }
}
