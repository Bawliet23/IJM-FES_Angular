import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Type} from "../models/Type";
import {Etudiant} from "../models/Etudiant";
import {Observable} from "rxjs";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  public url=webService.url+"/etudiants";
  public searchField : string = "";
  public pagenumber: number = 0;

  constructor(private http: HttpClient) {

  }


  addEtudiantInfos(data){
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data",'Accept': 'application/json' })
    }
    return this.http.post(this.url,data,{responseType: 'text'});
  }

  updateEtudiant(data,id){
    return this.http.patch(this.url+"/"+id,data);
  }

  getAllEtudiants(page){
    return this.http.get<Etudiant[]>(this.url+"?page="+page);
  }

  getEtudiantsByType(type_nom){
    return this.http.get<Etudiant[]>(this.url+"/type/"+type_nom);
  }

  getEtudiantById(id:number){
    return this.http.get<Etudiant>(this.url+"/"+id);
  }

  deleteEtudiant(id:number){
    return this.http.delete(this.url+"/"+id);
  }

  addActivite(id,activte_id){
    const formData = new  FormData();
    formData.append("activite_id",activte_id);
    return this.http.post(this.url+"/"+id+"/activites",formData,{responseType: 'text'});
  }

  deleteActivite(id,activte_id){
    const formData = new  FormData();
    formData.append("activite_id",activte_id);
    return this.http.delete(this.url+"/"+id+"/activites/"+activte_id);
  }

  searchByPrenomOrNom(query,page){
    return this.http.get(this.url+"?page="+page+"&query="+query);
  }

  getByNotInActivite(id,page){
    return this.http.get<Etudiant[]>(this.url+"/activite?id="+id+"&page="+page);
  }

  searchByPrenomOrNomAndNotInActivite(id,page,query){
    return this.http.get<Etudiant[]>(this.url+"/activite?query="+query+"&id="+id+"&page="+page);
  }

  getEtudiantsByExamId(id){
    return this.http.get<Etudiant>(this.url+"/exam/"+id);
  }

}
