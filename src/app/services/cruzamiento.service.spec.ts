import { TestBed } from '@angular/core/testing';

import { CruzamientoService } from './cruzamiento.service';

describe('CruzamientoService', () => {
  let service: CruzamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CruzamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
