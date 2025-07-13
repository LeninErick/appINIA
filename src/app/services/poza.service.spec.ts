import { TestBed } from '@angular/core/testing';

import { PozaService } from './poza.service';

describe('PozaService', () => {
  let service: PozaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PozaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
