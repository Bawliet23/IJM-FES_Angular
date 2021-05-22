import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaimentService} from "../../../services/paiment.service";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-paiments-list',
  templateUrl: './paiments-list.component.html',
  styleUrls: ['./paiments-list.component.css']
})
export class PaimentsListComponent implements OnInit {

  paiments;
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;

  constructor(private paimentService:PaimentService) {
    webService.currentPage="Paiements"
   }

  ngOnInit(): void {
    this.getPaiments();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    this.getPaiments();
  }

  getPaiments(){
    this.paimentService.getPaiments(this.page).subscribe((response)=>{
      this.paiments=response['paiments'];
      this.pages=new Array<number>(response['TotalPages']);
      console.log(response['TotalPages']);
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
    this.paimentService.searchByMois(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.paiments=response['paiments'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

}
