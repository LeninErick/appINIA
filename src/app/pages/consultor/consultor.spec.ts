import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultor } from './consultor';

describe('Consultor', () => {
  let component: Consultor;
  let fixture: ComponentFixture<Consultor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consultor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
