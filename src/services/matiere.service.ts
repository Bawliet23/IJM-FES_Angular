import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Matiere} from "../models/Matiere";
import {Activite} from "../models/Activite";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})

export class MatiereService {

  url=webService.url+"/matieres";

  constructor(private http:HttpClient) { }

  getMatieres(page=null){
    if(page==null)return this.http.get<Matiere[]>(this.url+"/allpages");
    else return this.http.get<Matiere[]>(this.url+"?page="+page);
  }

  addMatiere(data){
    return this.http.post(this.url,data);
  }

  getMatiereByNom(nom){
    return this.http.get<Matiere>(this.url+"/"+nom);
  }

  updateMatiere(nom,data){
    return this.http.patch(this.url+"/"+nom,data);
  }

  deleteMatiere(nom){
    return this.http.delete(this.url+"/"+nom);
  }

  searchByNom(query,page){
    return this.http.get(this.url+"?page="+page+"&nom="+query);
  }

}
