import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmedicoComponent } from './editmedico.component';

describe('EditmedicoComponent', () => {
  let component: EditmedicoComponent;
  let fixture: ComponentFixture<EditmedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditmedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
