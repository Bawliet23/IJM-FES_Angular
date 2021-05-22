import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActiviteService} from "../../../services/activite.service";
import {Activite} from "../../../models/Activite";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-activites-list',
  templateUrl: './activites-list.component.html',
  styleUrls: ['./activites-list.component.css']
})
export class ActivitesListComponent implements OnInit {

  activites:Activite[]=[];
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;

  constructor(private activiteService:ActiviteService) {
    webService.currentPage="Activités"
    this.isSearching=false;
  }

  ngOnInit(): void {
    this.getActivites();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getActivites();
  }

  getActivites(){
    this.activiteService.getActivites(this.page).subscribe((response)=>{
      this.activites=response['activites'];
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
      let p;
      if (this.searchPage==null)p=0;
      else p=this.page;
      this.search(text,p);
    });
  }

  search(query,page){
    this.activiteService.searchByNom(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.activites=response['activites'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

  countDuree(last,start,day){
    //console.log(last+" "+start+JSON.stringify(activite))
    let value;
    if (last==null && start==null)return null;
    let h1=last.split(":")[0];
    let h2=start.split(":")[0];
    let m1=last.split(":")[1];
    let m2=start.split(":")[1];
    if ((m1-m2)==0)value= (h1-h2)+"h30min";
    else
    value= (h1-h2)+"h";

    return day+" "+ start+" -> "+ this.add30Min(last) + " ("+value+")";
  }
  private  add30Min(value:string){
    if(value.search("30")!=-1)
        return parseInt(value.substring(0,value.indexOf(":")))+1+":00";
    else
        return parseInt(value.substring(0,value.indexOf(":")))+":30";
   }

}
