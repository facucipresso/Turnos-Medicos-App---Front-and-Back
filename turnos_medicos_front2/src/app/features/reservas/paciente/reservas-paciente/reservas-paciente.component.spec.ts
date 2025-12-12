import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasPacienteComponent } from './reservas-paciente.component';

describe('ReservasPacienteComponent', () => {
  let component: ReservasPacienteComponent;
  let fixture: ComponentFixture<ReservasPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
