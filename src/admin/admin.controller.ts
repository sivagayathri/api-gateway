import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminSignIn, CreateAdminDto } from './dto/create-admin.dto';

import { ApiResponse } from '@nestjs/swagger';

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
}
