import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActiviteService} from "../../../services/activite.service";
import {EtudiantService} from "../../../services/etudiant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {query} from "@angular/animations";
import { webService } from 'src/services/webService';

@Component({
  selector: 'app-activite-add-etudiants',
  templateUrl: './activite-add-etudiants.component.html',
  styleUrls: ['./activite-add-etudiants.component.css']
})
export class ActiviteAddEtudiantsComponent implements OnInit {

  page:number=0;
  searchPage=null;
  pages:Array<number>;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  isSearching: boolean;
  keyword;
  private id: number;
  activite;
  etudiants;
  etudiantsId:Array<number>;
  targetcheckBox;
  constructor(private route: ActivatedRoute,private router:Router,private activiteService:ActiviteService,public etudiantService:EtudiantService) {
    webService.currentPage="Activités"
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.activiteService.getActiviteById(this.id).subscribe((response)=>{
        this.activite=response;
        this.getEtudiants();
        this.init_search();
      },(error => console.log(error)));
    });
  }

  ngOnInit(): void {

  }

  changePage(direction,index){
    if (direction==null)this.page=index;
    else if (index==null && direction=="prev")this.page--;
    else if (index==null && direction=="next")this.page++;
    if (this.isSearching)this.search(this.keyword,this.page);
    else this.getEtudiants();
  }

  getEtudiants(){
    this.etudiantService.getByNotInActivite(this.id,this.page).subscribe((response)=>{
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
      let p;
      if (this.searchPage==null)p=0;
      else p=this.page;
      this.search(text,p);
    });
  }

  search(query,page){
    this.etudiantService.searchByPrenomOrNomAndNotInActivite(this.id,page,query)
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

  checkBoxChange(event,fromConfirmation=null){
    if (fromConfirmation==null) {
      this.targetcheckBox=event.target
    }
    else{
      this.activiteService.addEtudiant(this.id,this.targetcheckBox.value).subscribe(()=>{
        if (this.activite.type=="individu"){
          var checkboxes = document.querySelectorAll('input[type="checkbox"]');
          // @ts-ignore
          for (let checkbox of checkboxes) {
            checkbox.checked = false;
          }
          this.targetcheckBox.checked=true;
        }
      });
    }
  }

  isInActivites(etudiant_id){
    let d:boolean;
    d=this.etudiants[etudiant_id].activitiesGrp.some((a)=>a.id==this.id);
    if (d)return d;
    return this.etudiants[etudiant_id].activitiesIndv.some((a)=>a.id==this.id);
  }


}
