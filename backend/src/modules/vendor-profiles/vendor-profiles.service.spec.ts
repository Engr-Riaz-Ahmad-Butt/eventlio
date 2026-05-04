import { Test, TestingModule } from '@nestjs/testing';
import { VendorProfilesService } from './vendor-profiles.service';
import { PrismaService } from '../../database/prisma.service';

describe('VendorProfilesService', () => {
  let service: VendorProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorProfilesService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<VendorProfilesService>(VendorProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
