import { Test, TestingModule } from '@nestjs/testing';
import { VendorProfilesController } from './vendor-profiles.controller';

describe('VendorProfilesController', () => {
  let controller: VendorProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorProfilesController],
    }).compile();

    controller = module.get<VendorProfilesController>(VendorProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
