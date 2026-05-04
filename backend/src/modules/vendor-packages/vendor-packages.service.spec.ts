import { Test, TestingModule } from '@nestjs/testing';
import { VendorPackagesService } from './vendor-packages.service';
import { PrismaService } from '../../database/prisma.service';

describe('VendorPackagesService', () => {
  let service: VendorPackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorPackagesService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<VendorPackagesService>(VendorPackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
