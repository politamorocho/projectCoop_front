import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagReportesComponent } from './pag-reportes.component';

describe('PagReportesComponent', () => {
  let component: PagReportesComponent;
  let fixture: ComponentFixture<PagReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
