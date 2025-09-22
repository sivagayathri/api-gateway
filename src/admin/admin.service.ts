import { Inject, Injectable } from '@nestjs/common';
import { AdminSignIn, CreateAdminDto } from './dto/create-admin.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-admin-product.dto';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly userClient: ClientProxy,
    private readonly queueService: QueueService,
  ) {}

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.userClient.send('create-admin', createAdminDto);
  }

  loginAdmin(loginAdminDto: AdminSignIn) {
    return this.userClient.send('admin-login', loginAdminDto);
  }

  async productDetails(product: CreateProductDto[]) {
    for (const p of product) {
      await this.queueService.addStockJob({
        sku: p.sku,
        name: p.name,
        price: p.price,
        stock: p.stock,
        description: p.description,
        category: p.category,
      });
    }
    return { message: 'Products enqueued' };
  }
}
