import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPacienteComponent } from './layout-paciente.component';

describe('LayoutPacienteComponent', () => {
  let component: LayoutPacienteComponent;
  let fixture: ComponentFixture<LayoutPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
