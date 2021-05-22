import { Component, OnInit } from '@angular/core';
import {ActiviteService} from "../../../services/activite.service";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {Matiere} from "../../../models/Matiere";
import {Niveau} from "../../../models/Niveau";
import {TypeEtudiant} from "../../../models/TypeEtudiant";
import {Router} from "@angular/router";
import {SalleService} from "../../../services/salle.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-activite-create',
  templateUrl: './activite-create.component.html',
  styleUrls: ['./activite-create.component.css']
})
export class ActiviteCreateComponent implements OnInit {

  activite;
  matieres:Matiere[]=[];
  niveaux:Niveau[]=[];
  typesEtudiant:TypeEtudiant[]=[];
  salles;
  error;

  constructor(private route:Router,private activiteService:ActiviteService,private matiereService:MatiereService,private niveauService:NiveauService,private salleService:SalleService) {
    webService.currentPage="Activités"
   }

  ngOnInit(): void {
    this.activiteService.getTypesEtudiant().subscribe((response)=>this.typesEtudiant=response);
    this.matiereService.getMatieres().subscribe((response)=>this.matieres=response);
  //  this.niveauService.getNiveaux().subscribe((response)=>this.niveaux=response);
    this.salleService.getAllPages().subscribe((respons)=>this.salles=respons);
  }
  changeMatiere(nomMatiere){
    this.matiereService.getMatiereByNom(nomMatiere).subscribe(data=>{
      this.niveaux=data.niveaux;
    });
  }
  addActivite(form) {
   // console.log(form.value);
    if (!form.invalid){
      this.activiteService.addActivite(form.value).subscribe((id)=>{
        this.route.navigate(["/activites/"+id]);
      });
    }
    else{
      this.error="error";
    }
  }
}
