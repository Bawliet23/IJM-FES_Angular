import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  url=webService.url+"/annees";

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }
}
