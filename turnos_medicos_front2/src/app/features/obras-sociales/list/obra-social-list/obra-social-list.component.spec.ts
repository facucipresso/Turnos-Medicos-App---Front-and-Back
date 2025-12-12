import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialListComponent } from './obra-social-list.component';

describe('ObraSocialListComponent', () => {
  let component: ObraSocialListComponent;
  let fixture: ComponentFixture<ObraSocialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObraSocialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
