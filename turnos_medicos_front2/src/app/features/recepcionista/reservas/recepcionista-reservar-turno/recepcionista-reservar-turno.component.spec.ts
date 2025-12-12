import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaReservarTurnoComponent } from './recepcionista-reservar-turno.component';

describe('RecepcionistaReservarTurnoComponent', () => {
  let component: RecepcionistaReservarTurnoComponent;
  let fixture: ComponentFixture<RecepcionistaReservarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionistaReservarTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionistaReservarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
