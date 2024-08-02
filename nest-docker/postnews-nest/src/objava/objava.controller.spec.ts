import { Test, TestingModule } from '@nestjs/testing';
import { ObjavaController } from './objava.controller';

describe('ObjavaController', () => {
  let controller: ObjavaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjavaController],
    }).compile();

    controller = module.get<ObjavaController>(ObjavaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
