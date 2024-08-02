import { Test, TestingModule } from '@nestjs/testing';
import { ObjavaService } from './objava.service';

describe('ObjavaService', () => {
  let service: ObjavaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjavaService],
    }).compile();

    service = module.get<ObjavaService>(ObjavaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
