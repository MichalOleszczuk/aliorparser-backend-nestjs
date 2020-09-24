import { Test, TestingModule } from '@nestjs/testing';
import { EnvUtilsService } from './env-utils.service';

describe('EnvUtilsService', () => {
  let service: EnvUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvUtilsService],
    }).compile();

    service = module.get<EnvUtilsService>(EnvUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
