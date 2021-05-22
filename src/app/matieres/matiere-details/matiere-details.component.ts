import { Component, OnInit } from '@angular/core';
import {MatiereService} from "../../../services/matiere.service";
import {FormControl} from "@angular/forms";
import {NiveauService} from "../../../services/niveau.service";
import {ActivatedRoute, Router} from "@angular/router";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-matiere-details',
  templateUrl: './matiere-details.component.html',
  styleUrls: ['./matiere-details.component.css']
})
export class MatiereDetailsComponent implements OnInit {

  photo;
  matiere;
  error;
  success;
  matiereFile;
  public imagePath;
  imgURL: any;
  message;
  niveaux;
  niveauxSelected=new FormControl();
  nom;

  constructor(public matiereService:MatiereService,private niveauService:NiveauService,private route: ActivatedRoute,private router:Router) { 
    webService.currentPage="Matières"
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nom = params['nom'];
      this.matiereService.getMatiereByNom(this.nom).subscribe((response) => {
        this.matiere = response;
        if (this.matiere.nom == null) this.router.navigate(["/404"]);
        this.niveauService.getNiveaux().subscribe((data)=>{
            this.niveaux=data
            data=[];
            this.matiere.niveaux.forEach(niveau=>{
              data.push(niveau.nv);
              this.niveauxSelected.setValue(data);
            })
          },(error1 =>console.log(error1))
        );
      });
    })
  }

  onFileChanged(event){
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.matiereFile = file;

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

  deleteMatiere() {
    this.matiereService.deleteMatiere(this.nom).subscribe(()=>{
      this.router.navigate(["/matieres"]);
    })
  }

  updateMatiere() {
    const formData = new  FormData();
    let copy = Object.assign({}, this.matiere);
    delete this.matiere.profs;
    delete this.matiere.niveaux;
    delete this.matiere.activites;
    formData.append('matiere',JSON.stringify(this.matiere));
    formData.append("niveaux",this.niveauxSelected.value.join(","));
    this.matiere=copy;
    if (this.matiereFile!=null) formData.append('file',this.matiereFile);
    this.matiereService.updateMatiere(this.nom,formData).subscribe(data=>{
      this.success="la matiere a eté modifier avec succès";
      this.photo=this.imgURL;
    },(error)=>{
      this.error="error";
      console.log(error)
    })
  }
}
