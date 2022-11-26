import { Test, TestingModule } from '@nestjs/testing';
import { LimitController } from './limit.controller';

describe('LimitController', () => {
  let controller: LimitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LimitController],
    }).compile();

    controller = module.get<LimitController>(LimitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
