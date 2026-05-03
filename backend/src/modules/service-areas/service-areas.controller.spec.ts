import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAreasController } from './service-areas.controller';

describe('ServiceAreasController', () => {
  let controller: ServiceAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAreasController],
    }).compile();

    controller = module.get<ServiceAreasController>(ServiceAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
