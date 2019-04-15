import { TestBed, inject } from '@angular/core/testing';

import { SummaryUpdateService } from './summary-update.service';

describe('SummaryUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryUpdateService]
    });
  });

  it('should be created', inject([SummaryUpdateService], (service: SummaryUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
