import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Niveau} from "../models/Niveau";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  url=webService.url+"/niveaux";

  constructor(private http:HttpClient) { }

  getNiveaux(){
    return this.http.get<Niveau[]>(this.url);
  }
}
