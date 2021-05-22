import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Salle} from "../models/Salle";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url=webService.url+"/users";

  constructor(private http:HttpClient) { }

  getAll(page){
    return this.http.get<User[]>(this.url+"?page="+page);
  }

  searchByRole(query,page){
    if (query=="role_")query="";
    return this.http.get(this.url+"?page="+page+"&role="+query);
  }

  getPassword(type,id){
    return this.http.get(this.url+"/password?type="+type+"&id="+id,{responseType: 'text'});
  }
}
