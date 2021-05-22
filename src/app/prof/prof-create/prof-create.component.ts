import { Component, OnInit } from '@angular/core';
import {Type} from "../../../models/Type";
import {ProfService} from "../../../services/prof.service";
import {Router} from "@angular/router";
import {Prof} from "../../../models/Prof";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-prof-create',
  templateUrl: './prof-create.component.html',
  styleUrls: ['./prof-create.component.css']
})
export class ProfCreateComponent implements OnInit {

  error;
  success=false;
  pass;
  constructor(private profService:ProfService,private route:Router) {
    webService.currentPage="Professeurs"
   }

  ngOnInit(): void {

  }

  addProf(form){
    if (!form.invalid){
      const prof:Prof=form.value;
      this.profService.newProf(prof).subscribe((response)=>{
        this.success=true;
        this.pass=response;
      },error1 => {
        console.log(error1);
        this.error="error";
      })
    }
    else{
      this.error="error";
    }
  }

  okClick() {
    this.route.navigate(["/professeurs"]);
  }




}
