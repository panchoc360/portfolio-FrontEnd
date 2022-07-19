import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private autenticacion:AutenticacionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.autenticacion.IsLogged;
    if (currentUser && currentUser.token)
    {
      req = req.clone({
        setHeaders:{
          Authorizarion : `Bearer ${currentUser.accessToken}`
        }
      })
    }
    console.log(JSON.stringify(currentUser));
    return next.handle(req);
  }
}
