import { Inject, Injectable } from '@nestjs/common';
import { AdminSignIn, CreateAdminDto } from './dto/create-admin.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.userClient.send('create-admin', createAdminDto);
  }

  loginAdmin(loginAdminDto: AdminSignIn) {
    return this.userClient.send('admin-login', loginAdminDto);
  }
}
