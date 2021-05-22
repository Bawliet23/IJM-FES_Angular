
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponentComponent } from 'src/app/spinner-overlay-component/spinner-overlay-component.component';


@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private static overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) {}
   
  public show(url): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
   Promise.resolve(null).then(() => {
     if(SpinnerOverlayService.overlayRef==undefined)
     {
    SpinnerOverlayService.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      SpinnerOverlayService.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponentComponent));
      //console.log("created"+url);
    }
    });
  }

  public hide(url): void {
    if(SpinnerOverlayService.overlayRef!=undefined)
    {
      SpinnerOverlayService.overlayRef.detach();
   // console.log("destroyed" + url);
    SpinnerOverlayService.overlayRef = undefined;
  }
  }
}
