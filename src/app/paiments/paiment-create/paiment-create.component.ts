import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Activite} from "../../../models/Activite";
import {Type} from "../../../models/Type";
import {ActiviteService} from "../../../services/activite.service";
import {EtudiantService} from "../../../services/etudiant.service";
import {Etudiant} from "../../../models/Etudiant";
import {Mois} from "../../../models/Mois";
import {PaimentService} from "../../../services/paiment.service";
import {Router} from "@angular/router";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-paiment-create',
  templateUrl: './paiment-create.component.html',
  styleUrls: ['./paiment-create.component.css']
})
export class PaimentCreateComponent implements OnInit  {

  error;
  activiteControl = new FormControl();
  activites:Activite[]=[];
  filteredOptions: Observable<Activite[]>;

  etudiantControl = new FormControl();
  etudiants:Etudiant[]=[];
  filteredOptionsEtudiants: Observable<Etudiant[]>;

  mois:Mois[];
  moisSelected=new FormControl();

  constructor(private route:Router,private activiteService:ActiviteService, public etudiantService:EtudiantService,private paimentService:PaimentService) {
    webService.currentPage="Paiements"
  }

  ngOnInit() {
    this.activiteService.getActiviteswithLessInfos().subscribe((data)=>{
      this.activites=data;
      this.filteredOptions = this.activiteControl.valueChanges.pipe(
        startWith(''),
        map(activite => activite && typeof activite === 'object' ? activite.nom : activite)
        ,map(activite => this._filter(activite))
      );
    });
  }

  displayFn(activite: Activite) {
    return activite ? activite.nom : activite;
  }

  displayFnEtudiant(etudiant: Etudiant) {
    return etudiant ? etudiant.prenom+' '+etudiant.nom : etudiant;
  }


  private _filter(value: any): Activite[] {
    const filterValue = value.toLowerCase();
    return value ? this.activites.filter(s => s.nom.toLowerCase().indexOf(value.toLowerCase()) === 0)
      : this.activites;
  }

  private _filter_etudiant(value: any): Etudiant[] {
    const filterValue = value.toLowerCase();
    return value ? this.etudiants.filter(s => s.prenom.toLowerCase().indexOf(value.toLowerCase()) === 0)
      : this.etudiants;
  }

  getMois(e){
    if (e.target.value.substr(0,4)!=null){
      this.paimentService.getMoisByAnnee(e.target.value.substr(0,4)).subscribe((data)=>this.mois=data,(error1 => this.error='annee not exist'));
    }
  }

  addPaiment(form){
    if (!form.invalid){
      let etudiant_id=this.etudiantControl.value.id;
      let activite_id=this.activiteControl.value.id;
      form.value.etudiant_id=etudiant_id;
      form.value.activite_id=activite_id;
      form.value.mois=[];
      this.moisSelected.value.forEach(val=>{
        form.value.mois.push(new Mois(val));
      });
      this.paimentService.addPaiment(form.value).subscribe(()=>{
        this.route.navigate(["/paiments"]);
      },(error1 => this.error="error"));
    }else{
      this.error="error";
    }

  }

  getEtudiantsByType($event, type) {
    this.etudiantService.getEtudiantsByType(type.nom).subscribe((data)=>{
      this.etudiants=data;
      this.filteredOptionsEtudiants = this.etudiantControl.valueChanges.pipe(
        startWith(''),
        map(etudiant => etudiant && typeof etudiant === 'object' ? etudiant.prenom : etudiant)
        ,map(etudiant => this._filter_etudiant(etudiant))
      );
    });
  }
}
