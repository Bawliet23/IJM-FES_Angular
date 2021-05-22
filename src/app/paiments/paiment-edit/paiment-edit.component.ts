import { Component, OnInit } from '@angular/core';
import {PaimentService} from "../../../services/paiment.service";
import {EtudiantService} from "../../../services/etudiant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Paiment} from "../../../models/Paiment";
import {FormControl} from "@angular/forms";
import {Mois} from "../../../models/Mois";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-paiment-edit',
  templateUrl: './paiment-edit.component.html',
  styleUrls: ['./paiment-edit.component.css']
})
export class PaimentEditComponent implements OnInit {

  private id: number;
  paiment:Paiment;
  moisSelected=new FormControl();
  mois: any;
  error: any;
  success;

  constructor(private paimentService:PaimentService,private route: ActivatedRoute,private router:Router) { 
    webService.currentPage="Paiements"
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.paimentService.getPaimentById(this.id).subscribe((response) => {
        this.paiment = response;
        if (this.paiment.id == null) this.router.navigate(["/404"]);
        this.paimentService.getMoisByAnnee(this.paiment.datePaiment.substr(0,4)).subscribe((data)=>{
          this.mois=data
          data=[];
          this.paiment.mois.forEach(m=>{
            data.push(m.nom);
            this.moisSelected.setValue(data);
          })
        },(error1 => this.error='annee not exist'));

      });
    })
  }

  editPaiment(){
    delete this.paiment.activite;
    delete this.paiment.etudiant;
    this.paiment.mois=[];
    this.moisSelected.value.forEach(val=>{
      this.paiment.mois.push(new Mois(val));
    });
    this.paimentService.editPaiment(this.paiment,this.id).subscribe(()=>{
      this.success="le paiement a eté modifier avec succès";
    },(error1 => this.error="error"));
  }

  deletePaiment(){
    this.paimentService.deleteById(this.id).subscribe(()=>{
      this.router.navigate(["/paiments"]);
    });
  }

}
