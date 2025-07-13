import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaNavegacionComponent } from './ruta-navegacion.component';

describe('RutaNavegacionComponent', () => {
  let component: RutaNavegacionComponent;
  let fixture: ComponentFixture<RutaNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaNavegacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
