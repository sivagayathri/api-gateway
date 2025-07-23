import { Test, TestingModule } from '@nestjs/testing';
import { ProductServiceService } from './product-service.service';

describe('ProductServiceService', () => {
  let service: ProductServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductServiceService],
    }).compile();

    service = module.get<ProductServiceService>(ProductServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
