import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAreasService } from './service-areas.service';

describe('ServiceAreasService', () => {
  let service: ServiceAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAreasService],
    }).compile();

    service = module.get<ServiceAreasService>(ServiceAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
