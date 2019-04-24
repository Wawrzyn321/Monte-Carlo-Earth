import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  showError(message: string) {
    this.toastrService.error(message);
  }

  showWarning(message: string) {
    this.toastrService.warning(message);
  }
}
