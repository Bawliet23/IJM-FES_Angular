import {Component, ElementRef, Renderer2, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {EtudiantService} from "../../../services/etudiant.service";
import {Etudiant} from "../../../models/Etudiant";
import {HttpResponse} from "@angular/common/http";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {fromEvent} from "rxjs";
import {UserService} from "../../../services/user.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {

  etudiants:Etudiant[]=[];
  imageClick=false;
  etudiantClicked={fullName:'',photo:"",id:0};
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;
  passwordClick=false;
  password;

  constructor(public etudiantService:EtudiantService,private userService:UserService,private renderer:Renderer2) {
    webService.currentPage="Étudiants"
    this.isSearching=false;
  }

  ngOnInit(): void {

    if(this.etudiantService.searchField != "" && this.etudiantService.searchField != null)
    {
      this.renderer.setAttribute(this.searchInput.nativeElement, 'value', this.etudiantService.searchField );
      this.isSearching=true;
      this.searchPage=this.etudiantService.pagenumber;
      this.page=this.searchPage;
      this.search(this.etudiantService.searchField,this.searchPage);
      this.changePage(null,this.page);
    }
    else {
      this.getEtudiants();
    }
    this.init_search();

  }

  changePage(direction,index){
    if (direction==null){this.page=index;
    this.etudiantService.pagenumber=index;
    }
    else if (index==null && direction=="prev"){this.page--;
      this.etudiantService.pagenumber=this.page;}
    else if (index==null && direction=="next"){this.page++;
      this.etudiantService.pagenumber=this.page;}
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getEtudiants();
  }

  getEtudiants(){
    this.etudiantService.getAllEtudiants(this.page).subscribe((response)=>{
      this.etudiants=response['etudiants'];
      this.pages=new Array<number>(response['TotalPages']);
    },error => console.log(error));
  }

  init_search(){
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(250)
      , distinctUntilChanged()
    ).subscribe((text: string) => {

      this.isSearching = true;
      this.page=0;
      this.etudiantService.searchField=text;
      this.etudiantService.pagenumber=this.page;
      console.log(this.page)
      this.search(text,this.page);
    });
  }

  search(query,page){
    this.etudiantService.searchByPrenomOrNom(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.etudiants=response['etudiants'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

  getPassword(cin) {
    this.passwordClick=true;
    this.userService.getPassword("etudiant",cin).subscribe(response=>this.password=response);
  }


}
