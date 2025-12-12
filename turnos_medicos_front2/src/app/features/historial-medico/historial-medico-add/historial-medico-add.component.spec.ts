import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMedicoAddComponent } from './historial-medico-add.component';

describe('HistorialMedicoAddComponent', () => {
  let component: HistorialMedicoAddComponent;
  let fixture: ComponentFixture<HistorialMedicoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMedicoAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialMedicoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
