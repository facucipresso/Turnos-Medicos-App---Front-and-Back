import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMedicoListComponent } from './historial-medico-list.component';

describe('HistorialMedicoListComponent', () => {
  let component: HistorialMedicoListComponent;
  let fixture: ComponentFixture<HistorialMedicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMedicoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialMedicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
