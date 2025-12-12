import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialFormComponent } from './obra-social-form.component';

describe('ObraSocialFormComponent', () => {
  let component: ObraSocialFormComponent;
  let fixture: ComponentFixture<ObraSocialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObraSocialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
