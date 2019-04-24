import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse,
    HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notificationService/notification.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

// used to simplify intercept function header
type CompositeType = Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>;

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): CompositeType {

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                console.warn(error);
                if (error.status === 422) { // unprocessable failure
                    this.notificationService.showWarning('Cannot check point position, try again later.');
                } else {
                    this.notificationService.showError('Connection error!');
                }
            }
            return throwError(error);
        }));
    }
}
