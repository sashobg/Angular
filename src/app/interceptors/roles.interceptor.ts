import {
    HttpHandler,
    HttpEvent,
    HttpRequest,
    HttpInterceptor
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
  
  @Injectable()
  export class RolesInterceptor implements HttpInterceptor {
    userRoles: Array<string>
    constructor(
      private authService: AuthService
    ) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {
  
      const token = this.authService.getToken();
      if (token) {
        this.authService.user.pipe(map(user => {
          this.userRoles = Object.keys(user.roles)
  
          if (this.userRoles) {
            for (let rol of this.userRoles) {
              if (user.roles[rol] === true) {
                sessionStorage.setItem(rol, "true")
              }
            }
            if (this.userRoles['admin'] === false) {
              sessionStorage.removeItem('admin')
            }
          }
        })).subscribe()
      }
  
      return next.handle(req);
    }
  }
  