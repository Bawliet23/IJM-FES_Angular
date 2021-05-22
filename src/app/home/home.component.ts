import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {HomeService} from "../../services/home.service";
import {timer, Observable, Subject, Subscription} from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { webService } from 'src/services/webService';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  salles;
  subscription: Subscription;
  stats;

  constructor(private homeService:HomeService) {
    webService.currentPage="Accueil"
    this.subscription = timer(0, 1800000).pipe(
      switchMap(() => this.homeService.getFreeSalles())
    ).subscribe(result => {
      this.salles = result;
    });
  }

  ngOnInit(): void {
    this.homeService.getStats().subscribe((response)=>this.stats=response);
    console.log("ici")
 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
