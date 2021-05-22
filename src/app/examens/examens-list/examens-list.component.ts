import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExamService} from "../../../services/exam.service";
import {Exam} from "../../../models/Exam";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-examens-list',
  templateUrl: './examens-list.component.html',
  styleUrls: ['./examens-list.component.css']
})
export class ExamensListComponent implements OnInit {

  examens:Exam[];
  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;
  url=webService.url+"/examens/";

  constructor(private examService:ExamService) {
    webService.currentPage="Examens"
    this.isSearching=false;
  }

  ngOnInit(): void {
    this.getExamens();
    this.init_search();
  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getExamens();
  }

  getExamens(){
    this.examService.getAll(this.page).subscribe((response)=>{
      this.examens=response['examens'];
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
    this.examService.searchByAnnee(query,page)
      .subscribe((response) => {
        if (query==""){
          this.isSearching=false;
          this.page=0;
        }
        this.keyword=query;
        this.searchPage==this.page;
        this.examens=response['examens'];
        this.pages=new Array<number>(response['TotalPages']);
      });
  }

}
