import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import {LoaderService} from "./loader.service";
import { SpinnerOverlayService } from './spinner-overlay-service.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService,private readonly spinnerOverlayService: SpinnerOverlayService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //console.log(req.url);
  //&& req.url.match(/home.salles/)==null
    if(req.url.match(/professeurs.*horaire/)==null )
    {
      this.showLoader(req.url);
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd(req.url);
          }
        },
        (err: any) => {
          this.onEnd(req.url);
        }));
      }
      else 
      return next.handle(req);
   
  }
  private onEnd(url): void {
    this.hideLoader(url);
  }
  private showLoader(url): void {
    this.loaderService.show();
    this.spinnerOverlayService.show(url);
  }
  private hideLoader(url): void {
    this.loaderService.hide();
    this.spinnerOverlayService.hide(url);
  }
}
