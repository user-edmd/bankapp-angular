import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { filter, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class SecureInterceptor implements HttpInterceptor {
  readonly LSK_ACCESS_TOKEN: string = 'LSK_ACCESS_TOKEN';
  readonly LSK_EXPIRES_AT: string = 'LSK_EXPIRES_AT';

  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/api') > -1) {
      if(!this.isTokenValid()) {
        return this.auth.getAccessTokenSilently({detailedResponse: true}).pipe(
          tap(({id_token, expires_in}) => this.setTokenCache(id_token, expires_in)),
          filter(({id_token}) => typeof id_token === 'string'),
          mergeMap(({id_token}) => {
            const tokenReq = req.clone({
              setHeaders: { Authorization: `Bearer ${id_token}` }
            });
            return next.handle(tokenReq);
          }),
          catchError(err => throwError(err))
        );
      } 

      const tokenReq = req.clone({
        setHeaders: { Authorization: `Bearer ${localStorage.getItem(this.LSK_ACCESS_TOKEN)}` }
      });
      return next.handle(tokenReq);
      
    }
    return next.handle(req);
  }

  private setTokenCache(token: string, expiresIn: number) : void {
    localStorage.setItem(this.LSK_ACCESS_TOKEN, token);
    localStorage.setItem(this.LSK_EXPIRES_AT, JSON.stringify(expiresIn * 1000 + Date.now()))
  }

  private isTokenValid(): boolean {
    const EXPIRES_IN = localStorage.getItem(this.LSK_EXPIRES_AT)

    return EXPIRES_IN ? JSON.parse(EXPIRES_IN) > Date.now() : false
  }
}