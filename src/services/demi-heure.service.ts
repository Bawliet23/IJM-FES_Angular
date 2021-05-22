import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemiHeure} from "../models/DemiHeure";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class DemiHeureService {

  url=webService.url+"/demiHeurs";

  constructor(private http:HttpClient) { }

  getAllDemiHeures(){
    return this.http.get<DemiHeure[]>(this.url);
  }
}
