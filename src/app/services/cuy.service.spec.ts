import { TestBed } from '@angular/core/testing';

import { CuyService } from './cuy.service';

describe('CuyService', () => {
  let service: CuyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
