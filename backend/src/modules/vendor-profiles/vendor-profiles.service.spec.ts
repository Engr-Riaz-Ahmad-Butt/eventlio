import { Test, TestingModule } from '@nestjs/testing';
import { VendorProfilesService } from './vendor-profiles.service';

describe('VendorProfilesService', () => {
  let service: VendorProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendorProfilesService],
    }).compile();

    service = module.get<VendorProfilesService>(VendorProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
