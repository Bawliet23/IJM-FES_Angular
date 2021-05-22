import { Component, OnInit } from '@angular/core';
import {Type} from "../../../models/Type";
import {EtudiantService} from "../../../services/etudiant.service";
import {Router} from "@angular/router";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-etudiant-create',
  templateUrl: './etudiant-create.component.html',
  styleUrls: ['./etudiant-create.component.css']
})
export class EtudiantCreateComponent implements OnInit {

  etudiantFile ;
  public imagePath;
  imgURL: any;
  public message: string;
  error;
  success=false;
  pass;

  constructor(private route:Router,private etudiantService:EtudiantService) { 
    webService.currentPage="Étudiants"
  }

  selectedFile: File;

  public onFileChanged(event) {
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

  ngOnInit(): void {
  }

  addEtudiant(form){
    if (!form.invalid){
      const etudiant=form.value;
      const formData = new  FormData();
      etudiant.type=new Type(form.value.type_id.toString());
      delete etudiant.type_id;
      formData.append('etudiant',JSON.stringify(etudiant));
      formData.append('file',this.etudiantFile);
      this.etudiantService.addEtudiantInfos(formData).subscribe(response=>{
        this.success=true;
        this.pass=response;
      },(error)=>{
        this.error="tous les champs sont obligatoires";
        console.log(error)
      })
    }
    else{
      this.error="tous les champs sont obligatoires";
    }

  }

  okClick() {
    this.route.navigate(["/etudiants"]);
  }

}
