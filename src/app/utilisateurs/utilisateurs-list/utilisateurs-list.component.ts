import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/User";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {SalleService} from "../../../services/salle.service";
import {UserService} from "../../../services/user.service";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-utilisateurs-list',
  templateUrl: './utilisateurs-list.component.html',
  styleUrls: ['./utilisateurs-list.component.css']
})
export class UtilisateursListComponent implements OnInit {

  users: User[];
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;
  showPass=false;

  constructor(private userService:UserService) {
    webService.currentPage="Utilisateurs"
    this.isSearching=false;
  }

  ngOnInit(): void {
    this.getUsers();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getUsers();
  }

  getUsers(){
    this.userService.getAll(this.page).subscribe((response)=>{
      this.users=response['content'];
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
    query="role_"+query;
    this.userService.searchByRole(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.users=response['content'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

}
