import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRutasComponent } from './ver-rutas.component';

describe('VerRutasComponent', () => {
  let component: VerRutasComponent;
  let fixture: ComponentFixture<VerRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerRutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
