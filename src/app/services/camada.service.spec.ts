import { TestBed } from '@angular/core/testing';

import { CamadaService } from './camada.service';

describe('CamadaService', () => {
  let service: CamadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
