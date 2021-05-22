import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private authenticationService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': sessionStorage.getItem("basicauth")
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }

}
