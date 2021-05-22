import {Component, OnInit} from '@angular/core';
import {ProfService} from "../../../services/prof.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {Niveau} from "../../../models/Niveau";
import { Prof } from 'src/models/Prof';
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-prof-details',
  templateUrl: './prof-details.component.html',
  styleUrls: ['./prof-details.component.css']
})
export class ProfDetailsComponent implements OnInit {
  showSpinner=false;
  delteModel=false;
  prof;
  private sub: any;
  cin;
  niveauxSelected = new FormControl();
  matieres;
  matiere;
  niveaux=[];
  matiereToDelete;
  niveauToDelete;
  success;
  error;
  jourHoraire=null;
  pos: number;

  constructor(private router:Router,private profService:ProfService,private route: ActivatedRoute,private matiereService:MatiereService,private niveauService:NiveauService) { 
    webService.currentPage="Professeurs"
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cin = params['cin'];
      this.profService.getProfByCin(this.cin).subscribe((response)=>{
        this.prof=response;
        this.prof.dateNaissance=this.prof.dateNaissance.substr(0,10);
        if (response.cin==null)this.router.navigate(["/404"]);
        this.matiereService.getMatieres().subscribe((data)=>this.matieres=data);
       // this.niveauService.getNiveaux().subscribe((data)=>this.niveaux=data);
      },(error => console.log(error)));
    });
  }
  public  getEndHour(value1:string,value2:string):string{
    if(value2==null || value2=="")
    {
      if(value1.search("30")!=-1)
      return parseInt(value1.substring(0,value1.indexOf(":")))+1+":00";
  else
      return parseInt(value1.substring(0,value1.indexOf(":")))+":30";
    }
    if(value2.search("30")!=-1)
        return parseInt(value2.substring(0,value2.indexOf(":")))+1+":00";
    else
        return parseInt(value2.substring(0,value2.indexOf(":")))+":30";
   } 
  public  add30Min(value:string):string{
    if(value==null)
    return "";
    if(value.search("30")!=-1)
        return parseInt(value.substring(0,value.indexOf(":")))+1+":00";
    else
        return parseInt(value.substring(0,value.indexOf(":")))+":30";
   }
  updateProf() {
    const newProf=this.prof;
      this.profService.updateProf(newProf,this.cin).subscribe(()=>{
        this.success="le prof a eté modifier avec succès"
      },(error1 => {
        this.error="le cin n'est pas modifiable";
      }));
  }

  deleteProf() {
    this.profService.deleteProf(this.cin).subscribe(()=>{
        this.router.navigate(["/professeurs"]);
    });
  }

  addMatiere() {
    let data={nom:'',niveaux:[]};
    data.nom=this.matiere;
    this.niveauxSelected.value.forEach((value)=>{
      data.niveaux.push(new Niveau(value));
    })
    let d=false;
    this.prof.matieres.forEach(m=>{
      if (m.nom==data.nom){
        m.niveaux= m.niveaux.concat(data.niveaux.filter((item) => m.niveaux.indexOf(item) < 0))
        d=true;
      }
    });
    if (d==false)this.prof.matieres.push(data);
    this.profService.addMatiere(this.cin,data).subscribe(()=>{
      this.matiere="";
    },error1 => {
      this.error="Erreur lors de l'ajout de la matiere";
    });
  }
  selectMatiere(nom){
    //alert('ok'+nom);
    this.niveaux=[];
    this.matiereService.getMatiereByNom(nom).subscribe(data=>{this.niveaux=data.niveaux});
  }
  deleteMatiere() {
    return this.profService.deleteMatiere(this.cin,this.matiereToDelete.nom).subscribe(()=>{
      this.prof.matieres.splice(this.pos,1);
    },error1 => {
      this.error="Erreur lors de la suppression d'une matiere";
    })
  }

  deleteNvMatiere() {
    this.profService.deleteLignNvMatiere(this.cin,this.matiereToDelete.nom+this.niveauToDelete.nv).subscribe(()=>{
      const i:number=this.prof.matieres.indexOf(this.matiereToDelete);
      if (this.prof.matieres[i].niveaux.length==1){
        this.prof.matieres.splice(i,1);
      }
      else{
        this.prof.matieres[i].niveaux = this.prof.matieres[i].niveaux.filter(obj => obj !== this.niveauToDelete);
      }
    },error1 => {
      this.error="Erreur lors de la suppression d'un niveau";
    })
  }

  showHoraireTable(i: number,jour_nom) {
   
    if (this.prof.jours[i].horaires==null){
      this.showSpinner=true;
      this.profService.getHorairesByJour(this.cin,jour_nom)
        .subscribe((respons)=>{this.prof.jours[i].horaires=respons;this.showSpinner=false;
      //  console.log(JSON.stringify(this.prof.jours[i]))
      });
    }
    let el=document.querySelectorAll(".horairesInfos");
    let ind=document.querySelectorAll(".indicateur");
    if (el[i].getAttribute("style")==="display: none;"){
      for (let j = 0; j < el.length; j++) {
        // @ts-ignore
        el[j].style="display:none"
        ind[j].textContent="+";
      }
      // @ts-ignore
      el[i].style="display:block";
      ind[i].textContent="-";
    }else{
      // @ts-ignore
      el[i].style="display:none";
      ind[i].textContent="+";
    }

  }
}
