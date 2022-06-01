import { TestBed } from '@angular/core/testing';

import { CheckSessionGuard } from './check-session.guard';

describe('CheckSessionGuard', () => {
  let guard: CheckSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
