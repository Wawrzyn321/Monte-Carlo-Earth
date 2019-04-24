import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('calls Toastr\'s "error" function on "showErrorMessage" method',
    inject([NotificationService, ToastrService], (service: NotificationService, toastr: ToastrService) => {
      const spy: jasmine.Spy = spyOn(toastr, 'error');

      service.showError('sample error message');

      expect(spy).toHaveBeenCalledWith('sample error message');
  }));
});
