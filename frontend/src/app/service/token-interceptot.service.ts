import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptotService implements HttpInterceptor{

  constructor( private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
   let tokenizeReq = req.clone({
     setHeaders:{
       Authorization: `Bearer ${authService.getToken()}`
     }
   });
   return next.handle(tokenizeReq);

  }
}
