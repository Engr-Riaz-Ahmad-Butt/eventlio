import { Test, TestingModule } from '@nestjs/testing';
import { VendorPackagesController } from './vendor-packages.controller';
import { VendorPackagesService } from './vendor-packages.service';

describe('VendorPackagesController', () => {
  let controller: VendorPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorPackagesController],
      providers: [
        {
          provide: VendorPackagesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<VendorPackagesController>(VendorPackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
