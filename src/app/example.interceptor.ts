import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if ([401, 403].includes(err.status)) {
              this.router.navigate(['unauthorized']);
          }

          const error = err.error?.message || err.statusText;
          console.error(err);
          return throwError(() => error);
      }))
  }
}
