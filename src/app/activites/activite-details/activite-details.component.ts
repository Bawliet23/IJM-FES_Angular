import { Component, OnInit } from '@angular/core';
import {Matiere} from "../../../models/Matiere";
import {Niveau} from "../../../models/Niveau";
import {TypeEtudiant} from "../../../models/TypeEtudiant";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiviteService} from "../../../services/activite.service";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {Activite} from "../../../models/Activite";
import {EtudiantService} from "../../../services/etudiant.service";
import {FormControl} from "@angular/forms";
import {SalleService} from "../../../services/salle.service";
import {SeanceService} from "../../../services/seance.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-activite-details',
  templateUrl: './activite-details.component.html',
  styleUrls: ['./activite-details.component.css']
})
export class ActiviteDetailsComponent implements OnInit {

  delteModel=false;
  activite;
  matieres:Matiere[]=[];
  niveaux:Niveau[]=[];
  typesEtudiant:TypeEtudiant[]=[];
  salles;
  etudiants;
  error;

  id;
  success;
  etudiantSelected;
  seances;
  photo='assets/img/products/product-5-50.png';
  showPresence=false;
  presence;
  remarqueModal;
  infoModal;
  constructor(public etudiantService:EtudiantService,private route: ActivatedRoute,private router:Router,private activiteService:ActiviteService,public matiereService:MatiereService,private niveauService:NiveauService,private salleService:SalleService,private seanceService:SeanceService) {
    webService.currentPage="Activités"
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.activiteService.getActiviteById(this.id).subscribe((response)=>{
        this.activite=response;
        this.chargerNiveau(this.activite.matiere.nom);
       // this.niveaux=this.activite.niveaux;
        this.activiteService.getEtudiants(this.id).subscribe((response)=>this.etudiants=response);
        this.activiteService.getSeances(this.id).subscribe(response=>this.seances=response);
        this.photo=this.matiereService.url+"/photo/"+this.activite.matiere.nom;
       // this.matiereService.getMatiereByNom(this.activite.matiere.nom).subscribe(data=>);
      },(error => console.log(error)));
    });
    this.activiteService.getTypesEtudiant().subscribe((response)=>this.typesEtudiant=response);
    this.matiereService.getMatieres().subscribe((response)=>this.matieres=response);
//this.niveauService.getNiveaux().subscribe((response)=>this.niveaux=response);
    this.salleService.getAllPages().subscribe((response)=>this.salles=response);
  }

  deleteActivite() {
    this.activiteService.deleteActivite(this.id).subscribe(()=>{
      this.router.navigate( ["/activites"]);
    });
  }

  updateActivite() {
    this.activiteService.updateActivite(this.activite,this.id).subscribe(()=>{
      this.success="l'activité a eté modifier avec succès";
    },(error1 => console.log(error1)));
  }
  public  add30Min(value:string):string{
    if(value.search("30")!=-1)
        return parseInt(value.substring(0,value.indexOf(":")))+1+":00";
    else
        return parseInt(value.substring(0,value.indexOf(":")))+":30";
   }
  deleteEtudiant(){
    this.activiteService.deleteEtudiant(this.id,this.etudiantSelected).subscribe(()=>{
      const i=this.etudiantSelected;
      this.etudiants=this.etudiants.filter(function(el) { return el.id != i });
    })
  }

  seanceClick(seance,activite){
    this.showPresence=true;
    this.infoModal=activite.description + ": "+seance.date.split("T")[0];
    this.remarqueModal=seance.description;
    this.seanceService.getPresences(seance.id).subscribe(response=>{
      console.log(response);
      this.presence=response;
    });
  }
  chargerNiveau(nomMatiere){
    this.matiereService.getMatiereByNom(nomMatiere).subscribe(data=>{
      this.niveaux=data.niveaux;
    });
  }

}

