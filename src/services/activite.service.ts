import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activite} from "../models/Activite";
import {TypeEtudiant} from "../models/TypeEtudiant";
import {Niveau} from "../models/Niveau";
import {Matiere} from "../models/Matiere";
import {Etudiant} from "../models/Etudiant";
import {Jour} from "../models/Jour";
import {DemiHeure} from "../models/DemiHeure";
import {Horraire} from "../models/Horraire";
import {Salle} from "../models/Salle";
import {Seance} from "../models/Seance";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  public url=webService.url+"/activites";

  constructor(private http: HttpClient) { }

  getActivites(page){
    return this.http.get<Activite[]>(this.url+"?page="+page);
  }

  getActiviteswithLessInfos(){
    return this.http.get<Activite[]>(this.url+"/lessInofs");
  }

  getTypesEtudiant(){
    return this.http.get<TypeEtudiant[]>(webService.url+"/TypesEtudiant");
  }

  addActivite(activite){

    if (activite.gratuit_id=="oui")activite.gratuit=true;
    else activite.gratuit=false;
    delete activite.gratuit_id;
    activite.typeEtudiant=new TypeEtudiant(activite.typeEtudiant_id);
    delete activite.typeEtudiant_id;
    activite.salle=new Salle(activite.salle_id);
    delete activite.salle_id;
    return this.http.post(this.url,activite);
  }

  getActiviteById(id:number){
    return this.http.get<Activite>(this.url+"/"+id);
  }

  getActivitesByTypeEtudiantAndType(etudiant_id,typeEtudiant,type){
    return this.http.get<Activite[]>(this.url+"/"+etudiant_id+"/"+typeEtudiant+"/"+type);
  }

  updateActivite(data,id){
    let activite:Activite=new Activite();
    activite=data;
    activite.matiere_id=activite.matiere.nom;
    activite.niveau_id=activite.niveau.nv;
    return this.http.patch(this.url+"/"+id,data);
  }

  deleteActivite(id){
    return this.http.delete(this.url+"/"+id);
  }

  getEtudiants(id){
    return this.http.get<Etudiant>(this.url+"/"+id+"/etudiants");
  }

  searchByNom(query,page){
    return this.http.get(this.url+"?page="+page+"&nom="+query);
  }

  addEtudiant(id,idEtudiant){
    let form=new FormData();
    form.append("idEtudiant",idEtudiant);
    return this.http.post(this.url+"/"+id+"/etudiants",form);
  }

  deleteEtudiant(id,idEtudiant){
    return this.http.delete(this.url+"/"+id+"/etudiants/"+idEtudiant);
  }

  addHoraire(id,jour_nom,demiHeure_nom){
    let jour=new Jour(jour_nom);
    let demiHeure=new DemiHeure(demiHeure_nom);
    let horraire=new Horraire();
    horraire.jour=jour;
    horraire.demiHeure=demiHeure;
    return this.http.post(this.url+"/"+id+"/horaire",horraire);
  }

  deleteHoraire(id,horraire_id){
    return this.http.delete(this.url+"/"+id+"/horaire/"+horraire_id);
  }

  addProf(id,horraire_id,cin){
    let form=new FormData();
    form.append("horaire_id",horraire_id);
    form.append("cin",cin);
    return this.http.post(this.url+"/"+id+"/prof",form);
  }

  getHoraires(id){
    return this.http.get<Horraire[]>(this.url+"/"+id+"/horaires");
  }

  getSeances(id){
    return this.http.get<Seance[]>(this.url+"/"+id+"/seances");
  }

}
