import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Prof} from "../models/Prof";
import {Etudiant} from "../models/Etudiant";
import {HoraireData} from "../models/HoraireData";
import {Jour} from "../models/Jour";
import {DemiHeure} from "../models/DemiHeure";
import {Horraire} from "../models/Horraire";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  url=webService.url+"/professeurs";

  constructor(private http: HttpClient) {

  }

  getProfs(page){
    return this.http.get<Prof[]>(this.url+"?page="+page);
  }

  getProfByCin(cin){
    return this.http.get<Prof>(this.url+"/"+cin);
  }

  newProf(prof){
    return this.http.post(this.url,prof,{responseType: 'text'});
  }

  updateProf(prof,cin){
    return this.http.put(this.url+"/"+cin,prof);
  }

  deleteProf(cin){
    return this.http.delete(this.url+"/"+cin);
  }

  addMatiere(cin,data){
    return this.http.post(this.url+"/"+cin+"/matiere",data);
  }

  deleteMatiere(cin,matiere){
    return this.http.delete(this.url+"/"+cin+"/matiere/"+matiere);
  }

  deleteLignNvMatiere(cin,nvMatiere){
    return this.http.delete(this.url+"/"+cin+"/niveaumatiere/"+nvMatiere);
  }

  searchByPrenomOrNom(query,page){
    return this.http.get(this.url+"?page="+page+"&query="+query);
  }

  getHorairesByJour(cin,jour){
    return this.http.get<HoraireData[]>(this.url+"/"+cin+"/horaires/"+jour);
  }

  getProfFree(activite_id,jour,demiHeure){
    return this.http.get<Prof[]>(this.url+"/horaire?activite_id="+activite_id+"&jour="+jour+"&demiHeure="+demiHeure);
  }

  getAllProfHoraires(cin){
    return this.http.get<HoraireData[]>(this.url+"/"+cin+"/horaires");
  }

  addHoraire(cin,jour_nom,demiHeure_nom){
    let jour=new Jour(jour_nom);
    let demiHeure=new DemiHeure(demiHeure_nom);
    let horraire=new Horraire();
    horraire.jour=jour;
    horraire.demiHeure=demiHeure;
    return this.http.post(this.url+"/"+cin+"/horaire",horraire);
  }

  deleteHoraire(cin,horraire_id){
    return this.http.delete(this.url+"/"+cin+"/horaire/"+horraire_id);
  }

}
