import { Component, OnInit } from '@angular/core';
import {Jour} from "../../../models/Jour";
import {JourService} from "../../../services/jour.service";
import {DemiHeureService} from "../../../services/demi-heure.service";
import {ProfService} from "../../../services/prof.service";
import {ActivatedRoute} from "@angular/router";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-prof-add-horaire',
  templateUrl: './prof-add-horaire.component.html',
  styleUrls: ['./prof-add-horaire.component.css']
})
export class ProfAddHoraireComponent implements OnInit {

  jours:Jour[]=[];
  demiHeurs;
  cin;
  horaires;
  prof;
  checkBox={attribue:null,target:null,activite:null};

  constructor(private jourService:JourService,private demiHeureService:DemiHeureService,private profService:ProfService,private route: ActivatedRoute) {
    webService.currentPage="Professeurs"
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cin = params['cin'];
      this.prof=this.profService.getProfByCin(this.cin).subscribe((data)=>this.prof=data)
      this.profService.getAllProfHoraires(this.cin).subscribe((data)=>this.horaires=data)
      this.jourService.getAllJours().subscribe((data)=>this.jours=data);
      this.demiHeureService.getAllDemiHeures().subscribe((data)=>this.demiHeurs=data);
    });
  }

  isAttribue(jour,demiHeure){
    if (this.horaires==null)return false;
    return this.horaires.some((horaire)=>
      horaire.jour==jour && demiHeure==horaire.demiHeure && horaire.attribue===true
    );
  }

  isFree(jour,demiHeure){
    if (this.horaires==null)return false;
    return this.horaires.some((horaire)=>
      horaire.jour==jour && demiHeure==horaire.demiHeure && horaire.attribue==false
    );
  }


  checkBoxChange(event,jour,demiHeure) {
    if (this.isAttribue(jour,demiHeure)){
      event.preventDefault();
      event.target.checked=true;
      this.checkBox.target=event.target;
      this.checkBox.attribue=true;
      this.checkBox.activite=this.getActivite(jour,demiHeure);
    }
    else{
      if (event.target.checked) {
        this.profService.addHoraire(this.cin, event.target.value.split(',')[0], event.target.value.split(',')[1]).subscribe();
      } else {
        this.deleteHoraire(event.target.value);
      }
    }
  }

  deleteHoraire(val,el=null){
    this.profService.deleteHoraire(this.cin, val).subscribe(()=>{
      if (el!=null)el.checked=false;
    });
  }

  getActivite(jour,demiHeure){
    let activite;
    this.horaires.forEach(horaire=>{
      if (horaire.jour==jour && demiHeure==horaire.demiHeure)activite=horaire.activite;
    })
    return activite;
  }

}
