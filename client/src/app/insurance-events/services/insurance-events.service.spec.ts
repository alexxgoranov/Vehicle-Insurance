import { TestBed } from '@angular/core/testing';

import { InsuranceEventsService } from './insurance-events.service';

describe('InsuranceEventsService', () => {
  let service: InsuranceEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
