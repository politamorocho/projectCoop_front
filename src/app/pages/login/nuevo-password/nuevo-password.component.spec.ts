import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPasswordComponent } from './nuevo-password.component';

describe('NuevoPasswordComponent', () => {
  let component: NuevoPasswordComponent;
  let fixture: ComponentFixture<NuevoPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
