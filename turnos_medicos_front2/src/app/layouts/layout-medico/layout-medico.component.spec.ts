import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMedicoComponent } from './layout-medico.component';

describe('LayoutMedicoComponent', () => {
  let component: LayoutMedicoComponent;
  let fixture: ComponentFixture<LayoutMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
