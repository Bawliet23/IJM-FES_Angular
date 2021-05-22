import {Component, OnInit} from '@angular/core';
import {EtudiantService} from "../../../services/etudiant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {ActiviteService} from "../../../services/activite.service";
import {FormControl} from "@angular/forms";
import {Activite} from "../../../models/Activite";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import { Etudiant } from 'src/models/Etudiant';
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-etudiant-details',
  templateUrl: './etudiant-details.component.html',
  styleUrls: ['./etudiant-details.component.css']
})
export class EtudiantDetailsComponent implements OnInit {

  photo;
  etudiantFile ;
  public imagePath;
  imgURL: any;
  id: number;
  private sub: any;
  etudiant;
  public message: string;
  error;
  delteModel=false;
  success;
  showAddActiviteFormGroupe=false;
  showAddActiviteFormIndv=false;

  activiteSelected={id:'',type:'',index:20};
  activitesGrp;
  activitesIndv;
  activites;
  activiteControl = new FormControl();
  filteredOptions: Observable<Activite[]>;

  constructor(private router:Router,public etudiantService:EtudiantService,private route: ActivatedRoute,private activiteService:ActiviteService) { 
    webService.currentPage="Étudiants"
  }

  ngOnInit(): void {
    this.etudiant=new Object();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.etudiantService.getEtudiantById(this.id).subscribe((response)=>{
        this.etudiant=response;
        console.log(this.etudiant.preseneces);
        this.etudiant.preseneces.sort((a, b) => {
         // new Date()
         let x=new Date(a.seance.date);
         let y=new Date(b.seance.date);
        // console.log(x >y)
          return  y.valueOf() - x.valueOf();
  
      });
      console.log(this.etudiant.preseneces);
       // console.log(this.etudiant);
        //this.etudiant.dateNaissance=new Date(this.etudiant.dateNaissance + " 00:00:00");
        if (response.id==null)this.router.navigate(["/404"]);
        this.etudiant.dateInscription=this.etudiant.dateInscription.substr(0,10);
        this.etudiant.dateNaissance=this.etudiant.dateNaissance.substr(0,10);
      },(error => console.log(error)));
    });
  }

  onFileChanged(event){
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.etudiantFile = file;

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  updateEtudiant(){
    const formData = new  FormData();
    let copy = Object.assign({}, this.etudiant);
    delete this.etudiant.notes;
    delete this.etudiant.preseneces;
    delete this.etudiant.paiments;
    delete this.etudiant.activitiesIndv;
    delete this.etudiant.activitiesGrp;
    formData.append('etudiant',JSON.stringify(this.etudiant));
    this.etudiant=copy;
    if (this.etudiantFile!=null) formData.append('file',this.etudiantFile);
    this.etudiantService.updateEtudiant(formData,this.id).subscribe(data=>{
      this.photo=this.imgURL;
      this.success="l'étudiant a eté modifier avec succès";
    },(error)=>{
      this.error="error";
      console.log(error)
    })
  }

  deleteEtudient(){
    this.etudiantService.deleteEtudiant(this.etudiant.id).subscribe(()=>{
      this.router.navigate(["/etudiants"])
    });
  }

  getActivites(activiteType) {
   // console.log("lol");
    this.activiteControl.setValue(null);
    if (this.showAddActiviteFormGroupe==true && activiteType=='groupe'){
      this.activiteService.getActivitesByTypeEtudiantAndType(this.id,this.etudiant.type.nom,activiteType).subscribe((data)=>{
       //console.log(JSON.stringify(data))
        this.activitesGrp=data;
        this.activites = data;
        this.initAutoComplete();
      });
      this.activites=this.activitesGrp;
      this.showAddActiviteFormIndv=false;
    }
    if (this.showAddActiviteFormIndv==true && activiteType=='individu'){
     this.activiteService.getActivitesByTypeEtudiantAndType(this.id,this.etudiant.type.nom,activiteType).subscribe((data)=>{
        this.activitesIndv=data;
       // console.log(JSON.stringify(data))
        this.activites = data;
        this.initAutoComplete();
      });
      this.activites=this.activitesIndv;
      this.activites=this.activitesIndv;
      this.showAddActiviteFormGroupe=false;
    }
  }

  displayFn(activite: Activite) {
    return activite ? activite.nom : activite;
  }

  private _filter(value: any): Activite[] {
   // const filterValue ;
   // if(value!=null)
   // filterValue = value.toLowerCase();
    
    return value ? this.activites.filter(s => s.nom.toLowerCase().indexOf(value.toLowerCase()) === 0)
      : this.activites;
  }

  addActivite(type){
    this.etudiantService.addActivite(this.id,this.activiteControl.value.id).subscribe((data)=>{
      if (type=="groupe") this.etudiant.activitiesGrp.push(this.activiteControl.value);
      else this.etudiant.activitiesIndv.push(this.activiteControl.value);
      this.showAddActiviteFormIndv=false;
      this.showAddActiviteFormGroupe=false;
      this.activiteControl.setValue(null);
      if (data!=null){
      //  console.log(data);
        this.error=data.toString();
      }
    },(error1 => this.error=error1.error));
  }

  deleteActivite(activite_id,type) {
    this.etudiantService.deleteActivite(this.id,activite_id).subscribe(()=>{
      if (type=="groupe") this.etudiant.activitiesGrp.splice(this.activiteSelected.index,1);
      else this.etudiant.activitiesIndv.splice(this.activiteSelected.index,1);
      this.activiteSelected={id:'',type:'',index:20};
    })
  }

  initAutoComplete(){
    this.filteredOptions = this.activiteControl.valueChanges.pipe(
      startWith(''),
      map(activite => activite && typeof activite === 'object' ? activite.nom : activite)
      ,map(activite => this._filter(activite))
    );
  }
}
