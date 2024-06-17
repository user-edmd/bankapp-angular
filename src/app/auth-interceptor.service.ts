import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    this.loaderService.show(); 
    return next.handle(this.addAuthHeaderToAllowedOrigins(request)).pipe( 
        finalize(() => this.loaderService.hide()) 
    ) 
} 

  private addAuthHeaderToAllowedOrigins(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let req = request;
    const allowedOrigins = ['http://localhost'];
    if (!!allowedOrigins.find(origin => request.url.includes(origin))) {
      const authToken = this._oktaAuth.getAccessToken();
      req = request.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });
    }
    return req;
  }
}