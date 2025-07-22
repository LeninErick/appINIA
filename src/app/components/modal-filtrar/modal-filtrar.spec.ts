import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltrar } from './modal-filtrar';

describe('ModalFiltrar', () => {
  let component: ModalFiltrar;
  let fixture: ComponentFixture<ModalFiltrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFiltrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFiltrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
