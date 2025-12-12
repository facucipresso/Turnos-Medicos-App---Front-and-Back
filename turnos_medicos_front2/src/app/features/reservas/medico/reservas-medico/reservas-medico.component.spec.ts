import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasMedicoComponent } from './reservas-medico.component';

describe('ReservasMedicoComponent', () => {
  let component: ReservasMedicoComponent;
  let fixture: ComponentFixture<ReservasMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
