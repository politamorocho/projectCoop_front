import { TestBed } from '@angular/core/testing';

import { AccesoLoginGuard } from './acceso-login.guard';

describe('AccesoLoginGuard', () => {
  let guard: AccesoLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
