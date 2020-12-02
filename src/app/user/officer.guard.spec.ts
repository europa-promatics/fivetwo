import { TestBed, async, inject } from '@angular/core/testing';

import { OfficerGuard } from './officer.guard';

describe('OfficerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficerGuard]
    });
  });

  it('should ...', inject([OfficerGuard], (guard: OfficerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
