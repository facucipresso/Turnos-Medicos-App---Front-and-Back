import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaCancelarReservaComponent } from './recepcionista-cancelar-reserva.component';

describe('RecepcionistaCancelarReservaComponent', () => {
  let component: RecepcionistaCancelarReservaComponent;
  let fixture: ComponentFixture<RecepcionistaCancelarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionistaCancelarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionistaCancelarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
