import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSuspensionComponent } from './ver-suspension.component';

describe('VerSuspensionComponent', () => {
  let component: VerSuspensionComponent;
  let fixture: ComponentFixture<VerSuspensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerSuspensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSuspensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
