import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Exam} from "../models/Exam";
import {Salle} from "../models/Salle";
import {LigneNvMatiere} from "../models/LigneNvMatiere";
import {Niveau} from "../models/Niveau";
import {Matiere} from "../models/Matiere";
import {Annee} from "../models/Annee";
import { webService } from './webService';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  public url=webService.url+"/examens";

  constructor(private http:HttpClient) { }

  getAll(page){
    return this.http.get<Exam[]>(this.url+"?page="+page);
  }

  searchByAnnee(query,page){
    return this.http.get(this.url+"?page="+page+"&annee="+query);
  }

  addExam(data,file){
    data.ligneNvMatiere=new LigneNvMatiere(data.matiere_id+data.niveau_id);
    delete data.niveau_id;
    delete data.matiere_id;
    data.annee=new Annee(data.annee_id);
    delete data.annee_id;
    const formData = new  FormData();
    formData.append('exam',JSON.stringify(data));
    formData.append('file',file);
    console.log(file);
    return this.http.post(this.url,formData);
  }

  getExamById(id){
    return this.http.get<Exam>(this.url+"/"+id);
  }

  editExam(data,file,id){
    data.ligneNvMatiere=new LigneNvMatiere(data.matiere.nom+data.niveau.nv);
    let c=data;
    delete c.niveau;
    delete c.matiere;
    const formData = new  FormData();
    formData.append('exam',JSON.stringify(c));
    if (file!=null)formData.append('file',file);
    return this.http.put(this.url+"/"+id,formData);
  }

  deleteExam(id){
    return this.http.delete(this.url+"/"+id);
  }

  addNotes(id,data){
    return this.http.post(this.url+"/"+id+"/addNotes",data);
  }

}
