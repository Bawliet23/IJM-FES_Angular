import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Matiere} from "../../../models/Matiere";
import {MatiereService} from "../../../services/matiere.service";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-matieres-list',
  templateUrl: './matieres-list.component.html',
  styleUrls: ['./matieres-list.component.css']
})
export class MatieresListComponent implements OnInit {

  imageClick=false;
  matieres:Matiere[];
  matiereClicked={nom:'',photo:""};
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;

  constructor(public matiereService:MatiereService) { 
    webService.currentPage="Matières"
  }

  ngOnInit(): void {
    this.getMatieres();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getMatieres();
  }

  getMatieres(){
    this.matiereService.getMatieres(this.page).subscribe((response)=>{
      this.matieres=response['content'];
      this.pages=new Array<number>(response['totalPages']);
      console.log(response['totalPages']);
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
      let p;
      if (this.searchPage==null)p=0;
      else p=this.page;
      this.search(text,p);
    });
  }

  search(query,page){
    this.matiereService.searchByNom(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.matieres=response['content'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

}
