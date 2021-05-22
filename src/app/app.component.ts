import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'IJMFes';
  isLoggedIn;
  loading=false;
  url;
  public getCurrentPage():string
  {
    return webService.currentPage;
  }
  constructor(private authService:AuthService,private http:HttpClient,public router: Router) {
    
    /*this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });**/
    this.authService.UserLogged.subscribe( value => {
      this.isLoggedIn = value;
    });
  }

  handleLogout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
