import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExamService} from "../../../services/exam.service";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {AnneeService} from "../../../services/annee.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {

  error;
  success=false;
  exam;
  id;
  annees;
  niveaux;
  matieres;
  file=null;
  message;
  filePath;

  constructor(private route: ActivatedRoute,private router:Router,private examService:ExamService,private matiereService:MatiereService,private niveauService:NiveauService,private anneeService:AnneeService) {
    webService.currentPage="Examens"
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.examService.getExamById(this.id).subscribe((response)=>{
        this.exam=response;
        this.matiereService.getMatieres().subscribe((response)=>this.matieres=response);
        this.niveauService.getNiveaux().subscribe((response)=>this.niveaux=response);
        this.anneeService.getAll().subscribe((response)=>this.annees=response);
      },(error => console.log(error)));
    });
  }
  changeMatiere(nomMatiere){
    this.matiereService.getMatiereByNom(nomMatiere).subscribe(data=>{this.niveaux=data.niveaux});
  }
  public onFileChanged(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.file = file;

      var mimeType = event.target.files[0].type;

      var reader = new FileReader();

      this.filePath = file;
      console.log(this.file);
    }
  }

  deleteExam() {
    this.examService.deleteExam(this.id).subscribe(()=>{
      this.router.navigate(["/examens"]);
    });
  }

  editExam() {
    this.exam.id=this.id;
    this.examService.editExam(this.exam,this.file,this.id).subscribe(()=>{
      this.success=true;
    })
  }
}
