import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Prof} from "../models/Prof";
import {Salle} from "../models/Salle";
import {Activite} from "../models/Activite";
import {HoraireData} from "../models/HoraireData";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  url=webService.url+"/salles";

  constructor(private http:HttpClient) { }

  getAll(page=null){
    if (page==null) return this.http.get<Salle[]>(this.url);
    else return this.http.get<Salle[]>(this.url+"?page="+page);
  }
  getAllPages(){
     return this.http.get<Salle[]>(this.url+"/allpages");
  }
  searchByNom(query,page){
    return this.http.get(this.url+"?page="+page+"&nom="+query);
  }

  getFreeSalles(jour,demiHeure){
    return this.http.get<Salle[]>(this.url+"/horaire?jour="+jour+"&demiHeure="+demiHeure);
  }

  addSalle(nom){
    return this.http.post(this.url,new Salle(nom));
  }

  deleteSalle(nom){
    return this.http.delete(this.url+"/"+nom);
  }

  getSalleHoraires(nom){
    return this.http.get<HoraireData>(this.url+"/"+nom+"/horaires");
  }

  isFree(jour,demiHeure,activite_id){
    return this.http.get<boolean>(this.url+"/isFree?jour="+jour+"&demiHeure="+demiHeure+"&activite_id="+activite_id);
  }

}
