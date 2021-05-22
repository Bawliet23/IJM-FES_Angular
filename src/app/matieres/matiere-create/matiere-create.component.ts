import { Component, OnInit } from '@angular/core';
import {Mois} from "../../../models/Mois";
import {FormControl} from "@angular/forms";
import {Niveau} from "../../../models/Niveau";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {Type} from "../../../models/Type";
import {Router} from "@angular/router";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-matiere-create',
  templateUrl: './matiere-create.component.html',
  styleUrls: ['./matiere-create.component.css']
})
export class MatiereCreateComponent implements OnInit {

  matiereFile ;
  public imagePath;
  imgURL: any;
  public message: string;
  error;
  niveaux:Niveau[];
  niveauSelected=new FormControl();

  constructor(private route:Router,private matiereService:MatiereService,private niveauService:NiveauService) {
    webService.currentPage="Matières"
   }

  ngOnInit(): void {
    this.niveauService.getNiveaux().subscribe((response)=>this.niveaux=response);
  }

  public onFileChanged(event) {
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


  addMatiere(form) {
    if (!form.invalid){
      const matiere=form.value;
      const formData = new  FormData();
      formData.append('matiere',JSON.stringify(matiere));
      formData.append('file',this.matiereFile);
      formData.append("niveaux",this.niveauSelected.value.join(","));
      this.matiereService.addMatiere(formData).subscribe(date=>{
        this.route.navigate(["/matieres"])
      },(error)=>{
        this.error="error";
        console.log(error)
      })
    }
    else{
      this.error="error";
    }
  }
}
