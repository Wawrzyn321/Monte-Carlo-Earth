import { TestBed, inject } from '@angular/core/testing';

import { SummaryUpdateService } from './summary-update.service';
import { Point } from 'src/app/model';

describe('SummaryUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryUpdateService]
    });
  });

  it('emits event with Point on emitIncrementEvent', inject([SummaryUpdateService], (service: SummaryUpdateService) => {
    const dummyPoint: Point = {
      isOnWater: true,
      latitude: 10,
      longitude: 21,
      location: null
    };

    service.incrementEvent.subscribe(point => {
      expect(point).toEqual(dummyPoint);
    });

    service.emitIncrementEvent(dummyPoint);
  });
});
