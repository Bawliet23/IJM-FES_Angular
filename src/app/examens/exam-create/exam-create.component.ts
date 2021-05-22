import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActiviteService} from "../../../services/activite.service";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {ExamService} from "../../../services/exam.service";
import {AnneeService} from "../../../services/annee.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  error;
  matieres;
  niveaux;
  annees;
  file;
  message;
  filePath;

  constructor(private route:Router,private examService:ExamService,private matiereService:MatiereService,private niveauService:NiveauService,private anneeService:AnneeService) {
    webService.currentPage="Examens"
   }

  ngOnInit(): void {
    this.matiereService.getMatieres().subscribe((response)=>this.matieres=response);
   // this.niveauService.getNiveaux().subscribe((response)=>this.niveaux=response);
    this.anneeService.getAll().subscribe((response)=>this.annees=response);
  }

  public onFileChanged(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.file = file;

      var mimeType = event.target.files[0].type;

      var reader = new FileReader();

      this.filePath = file;
      console.log(this.filePath);
    }
  }
  changeMatiere(nomMatiere){
    this.matiereService.getMatiereByNom(nomMatiere).subscribe(data=>{this.niveaux=data.niveaux});
  }

  addExam(form) {
    if (!form.invalid){
      this.examService.addExam(form.value,this.file).subscribe(()=>{
        this.route.navigate(["/examens"]);
      });
    }
    else{
      this.error="error";
    }
  }
}
