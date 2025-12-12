import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdministradorComponent } from './layout-administrador.component';

describe('LayoutAdministradorComponent', () => {
  let component: LayoutAdministradorComponent;
  let fixture: ComponentFixture<LayoutAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
