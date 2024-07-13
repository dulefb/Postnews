import { TestBed } from '@angular/core/testing';

import { ObjaveServiceService } from './objave-service.service';

describe('ObjaveServiceService', () => {
  let service: ObjaveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjaveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
