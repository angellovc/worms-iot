import { Test, TestingModule } from '@nestjs/testing';
import { LimitService } from './limit.service';

describe('LimitService', () => {
  let service: LimitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LimitService],
    }).compile();

    service = module.get<LimitService>(LimitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
