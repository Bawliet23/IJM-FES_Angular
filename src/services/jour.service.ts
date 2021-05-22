import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Jour} from "../models/Jour";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class JourService {

  url=webService.url+"/jours";

  constructor(private http:HttpClient) { }

  getAllJours(){
    return this.http.get<Jour[]>(this.url);
  }

}
