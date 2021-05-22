import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Prof} from "../../../models/Prof";
import {ProfService} from "../../../services/prof.service";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {UserService} from "../../../services/user.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-prof-list',
  templateUrl: './prof-list.component.html',
  styleUrls: ['./prof-list.component.css']
})
export class ProfListComponent implements OnInit {

  professeurs:Prof[]=[]
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;
  passwordClick=false;
  password;

  constructor(private profService:ProfService,private userService:UserService) {
    webService.currentPage="Professeurs"
    this.isSearching=false;
  }

  ngOnInit(): void {
    this.getProfs();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getProfs();
  }

  getProfs(){
    this.profService.getProfs(this.page).subscribe((response)=>{
      this.professeurs=response['profs'];
      this.pages=new Array<number>(response['TotalPages']);
    //  console.log(response['TotalPages']);
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
    this.profService.searchByPrenomOrNom(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.professeurs=response['profs'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

  getPassword(cin: string) {
    this.passwordClick=true;
    this.userService.getPassword("prof",cin).subscribe(response=>this.password=response);
  }
}
