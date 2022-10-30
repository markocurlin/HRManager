import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, tap, switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service.component';
import { Constants } from '../constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(
    private authService: AuthService,
    private router: Router,  
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.startsWith(Constants.apiRoot)) {
      return next.handle(req);
    }
    return from(this.authService.getAccessToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq);
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          console.log('auth')
          console.log(error)
          this.router.navigate(['/unauthorized']);
        }
        return throwError(error);
      })
    );
  }
}