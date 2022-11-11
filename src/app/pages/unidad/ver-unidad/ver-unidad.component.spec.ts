import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUnidadComponent } from './ver-unidad.component';

describe('VerUnidadComponent', () => {
  let component: VerUnidadComponent;
  let fixture: ComponentFixture<VerUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
