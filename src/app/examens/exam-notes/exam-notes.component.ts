import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExamService} from "../../../services/exam.service";
import {MatiereService} from "../../../services/matiere.service";
import {NiveauService} from "../../../services/niveau.service";
import {AnneeService} from "../../../services/annee.service";
import {EtudiantService} from "../../../services/etudiant.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-exam-notes',
  templateUrl: './exam-notes.component.html',
  styleUrls: ['./exam-notes.component.css']
})
export class ExamNotesComponent implements OnInit {

  id;
  etudiants;
  exam;
  error;
  success=false;

  constructor(private route: ActivatedRoute,private router:Router,private examService:ExamService,public etudiantService:EtudiantService) {
    webService.currentPage="Notes"
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.examService.getExamById(this.id).subscribe((response)=>{
        this.exam=response;
        this.etudiantService.getEtudiantsByExamId(this.id).subscribe((data)=>this.etudiants=data);
      },(error => console.log(error)));
    });
  }

  addNotes(){
    this.examService.addNotes(this.id,this.etudiants).subscribe(()=>{
      this.success=true;
    },error1 => {
      this.error="error";
    });
  }

}
