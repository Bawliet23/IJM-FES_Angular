import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Presence} from "../models/Presence";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  url=webService.url+"/seances";

  constructor(private http:HttpClient) { }

  getPresences(id){
    return this.http.get<Presence>(this.url+"/"+id+"/presences");
  }

}
