import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRuta } from './modal-ruta';

describe('ModalRuta', () => {
  let component: ModalRuta;
  let fixture: ComponentFixture<ModalRuta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRuta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRuta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
