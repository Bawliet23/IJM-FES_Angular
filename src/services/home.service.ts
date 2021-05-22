import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url=webService.url+"/home";

  constructor(private http:HttpClient) { }

  getStats(){
    return this.http.get(this.url+"/stats");
  }

  getFreeSalles(){
    return this.http.get(this.url+"/salles");
  }

  getCaisse(){
    return this.http.get(this.url+"/caisse");
  }
}
