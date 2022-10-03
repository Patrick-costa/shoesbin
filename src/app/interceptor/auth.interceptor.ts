import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        const url = request.url.split('/');        
        if (token && url[2] != "viacep.com.br") {
            const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
            return next.handle(cloneReq);
        } else {
            return next.handle(request);
        }
    }
}

export const AuthInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]