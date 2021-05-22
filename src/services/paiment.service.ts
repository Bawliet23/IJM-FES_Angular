import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paiment} from "../models/Paiment";
import {Mois} from "../models/Mois";
import {Activite} from "../models/Activite";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class PaimentService {

  public url=webService.url+"/paiments";

  constructor(private http:HttpClient) { }

  getPaiments(page){
    return this.http.get<Paiment[]>(this.url+"?page="+page);
  }

  getMoisByAnnee(annee){
    return this.http.get<Mois[]>(webService.url+"/mois/"+annee);
  }

  getPaimentById(id){
    return this.http.get<Paiment>(this.url+"/"+id);
  }

  addPaiment(paiment){
    return this.http.post(this.url,paiment);
  }

  editPaiment(paiment,id){
    return this.http.put(this.url+"/"+id,paiment);
  }

  deleteById(id){
    return this.http.delete(this.url+"/"+id);
  }

  searchByMois(query,page){
    return this.http.get(this.url+"?page="+page+"&mois="+query);
  }

}
