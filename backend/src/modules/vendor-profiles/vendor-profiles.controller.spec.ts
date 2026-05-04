import { Test, TestingModule } from '@nestjs/testing';
import { VendorProfilesController } from './vendor-profiles.controller';
import { VendorProfilesService } from './vendor-profiles.service';

describe('VendorProfilesController', () => {
  let controller: VendorProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorProfilesController],
      providers: [
        {
          provide: VendorProfilesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<VendorProfilesController>(VendorProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
