import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Salle} from "../../../models/Salle";
import {SalleService} from "../../../services/salle.service";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-salles-list',
  templateUrl: './salles-list.component.html',
  styleUrls: ['./salles-list.component.css']
})
export class SallesListComponent implements OnInit {

  salles:Salle[];
  salle_nom;
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;
  horaires;
  pos=104;

  constructor(private salleService:SalleService) {
    webService.currentPage="Salles"
    this.isSearching=false;
  }

  ngOnInit(): void {
    this.getSalles();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getSalles();
  }

  getSalles(){
    this.salleService.getAll(this.page).subscribe((response)=>{
      this.salles=response['content'];
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
  public  getEndHour(value1:string,value2:string):string{
    if(value2==null)
    {
      if(value1.search("30")!=-1)
      return parseInt(value1.substring(0,value1.indexOf(":")))+1+":00";
  else
      return parseInt(value1.substring(0,value1.indexOf(":")))+":30";
    }
    if(value2.search("30")!=-1)
        return parseInt(value2.substring(0,value2.indexOf(":")))+1+":00";
    else
        return parseInt(value2.substring(0,value2.indexOf(":")))+":30";
   }
  search(query,page){
    this.salleService.searchByNom(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.salles=response['content'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

  addSalle(nom) {
    this.salleService.addSalle(nom).subscribe(()=>{
      this.salles.push(new Salle(nom));
    });
  }

  deleteSalle() {
    this.salleService.deleteSalle(this.salle_nom).subscribe(()=>{
      // @ts-ignore
      this.salles.splice(this.pos,1);
    })
  }


  getHoraires(nom){
    this.salleService.getSalleHoraires(nom).subscribe((data)=>this.horaires=data);
  }
}

