import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesCreateComponent } from './antecedentes-create.component';

describe('AntecedentesCreateComponent', () => {
  let component: AntecedentesCreateComponent;
  let fixture: ComponentFixture<AntecedentesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntecedentesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntecedentesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
