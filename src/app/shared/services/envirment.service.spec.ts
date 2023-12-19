import { TestBed } from '@angular/core/testing';

import { EnvirmentService } from './envirment.service';

describe('EnvirmentService', () => {
  let service: EnvirmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvirmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
