import { Component, OnInit } from '@angular/core';
import {JourService} from "../../../services/jour.service";
import {DemiHeureService} from "../../../services/demi-heure.service";
import {Jour} from "../../../models/Jour";
import {ActiviteService} from "../../../services/activite.service";
import {ActivatedRoute} from "@angular/router";
import {ProfService} from "../../../services/prof.service";
import {SalleService} from "../../../services/salle.service";
import {Horraire} from "../../../models/Horraire";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-activite-add-horaire',
  templateUrl: './activite-add-horaire.component.html',
  styleUrls: ['./activite-add-horaire.component.css']
})
export class ActiviteAddHoraireComponent implements OnInit {

  jours:Jour[]=[];
  horaires:Horraire[]=[];
  success;
  demiHeurs;
  id;
  model=false;
  freeProfs;
  clickedJour;
  clickedDemiHeure;
  selectedProf;
  nomActivite;
  checkBox={id:null,attribue:null,target:null,prof:null,prbl:null};
  constructor(private jourService:JourService,private demiHeureService:DemiHeureService,private activiteService:ActiviteService,private route: ActivatedRoute,private profService:ProfService,private salleService:SalleService) {
    webService.currentPage="Activités"
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.activiteService.getActiviteById(this.id).subscribe(data=>this.nomActivite=data.nom);
      this.activiteService.getHoraires(this.id).subscribe((response)=>{
        this.horaires=response;
        this.jourService.getAllJours().subscribe((data)=>this.jours=data);
        this.demiHeureService.getAllDemiHeures().subscribe((data)=>this.demiHeurs=data);
      },(error => console.log(error)));
    });

  }

  isInAttribue(jour,demiHeure){
    if (this.horaires==null)return false;
    return this.horaires.some((horaire)=>
      horaire.jour==jour && demiHeure==horaire.demiHeure && horaire.attribue===true
    );
  }

  isInProfHoraires(jour,demiHeure){
    if (this.horaires==null)return false;
    return this.horaires.some((horaire)=>
      horaire.jour==jour && demiHeure==horaire.demiHeure && horaire.attribue==false
    );
  }

  checkBoxClicked(event,jour,demiHeure,index){
    event.preventDefault();
    if (this.isInProfHoraires(jour,demiHeure)){
      this.getFreeProf(jour,demiHeure);
      this.clickedDemiHeure=demiHeure;
      this.clickedJour=jour;
      this.checkBox.id=index;
      this.checkBox.target=event.target;
      this.checkBox.attribue=false;
      this.salleService.isFree(jour,demiHeure,this.id).subscribe((res)=>this.checkBox.prbl=res);
    }
    else if (this.isInAttribue(jour,demiHeure)){
      this.checkBox.id=index;
      this.checkBox.target=event.target;
      this.checkBox.attribue=true;
      let h=this.getHoraire(demiHeure,jour);
      this.checkBox.prof=h.prof;
    }
  }

  getHoraire(demiHeure,jour){
    let h;
    this.horaires.forEach(horaire=>{
      if (horaire.jour==jour && demiHeure==horaire.demiHeure)h=horaire;
    });
    return h;
  }

  deleteDemiHeure(){
    var c=document.querySelectorAll(".custom-control-input");
    // @ts-ignore
    this.activiteService.deleteHoraire(this.id,this.checkBox.target.value).subscribe(()=>{
      let v=this.checkBox.target.nextSibling;
      v.setAttribute("class","inHoraire custom-control-label");
      let h=this.getHoraire(this.checkBox.target.value.split(",")[1],this.checkBox.target.value.split(",")[0]);
      h.attribue=false;
    });
  }

  getFreeProf(jour,demiHeure){
    this.profService.getProfFree(this.id,jour,demiHeure).subscribe((data)=>{
      this.freeProfs=data;
    });
  }

  addProf() {
    if (this.selectedProf!=null){
      this.activiteService.addProf(this.id,this.clickedJour+","+this.clickedDemiHeure,this.selectedProf).subscribe(()=>{
        let v=this.checkBox.target.nextSibling;
        v.setAttribute("class","custom-control-label");
        let h=this.getHoraire(this.checkBox.target.value.split(",")[1],this.checkBox.target.value.split(",")[0]);
        h.attribue=true;
      });
    }
    this.success="l'affection a été fait";
  }

}
