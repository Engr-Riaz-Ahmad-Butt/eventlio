import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAreasController } from './service-areas.controller';
import { ServiceAreasService } from './service-areas.service';

describe('ServiceAreasController', () => {
  let controller: ServiceAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAreasController],
      providers: [
        {
          provide: ServiceAreasService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ServiceAreasController>(ServiceAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
