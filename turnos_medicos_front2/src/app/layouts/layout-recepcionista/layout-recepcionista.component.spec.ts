import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRecepcionistaComponent } from './layout-recepcionista.component';

describe('LayoutRecepcionistaComponent', () => {
  let component: LayoutRecepcionistaComponent;
  let fixture: ComponentFixture<LayoutRecepcionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRecepcionistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
