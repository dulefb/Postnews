import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import e from 'express';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectQueryObjaveAsArray } from '../../store/query.selectors';
import { FormsModule } from '@angular/forms';
import { debounceTime, filter, from, map, Observable, of, Subject } from 'rxjs';
import * as QueryActions from '../../store/query.actions';
import { nextTick } from 'process';
import { Objava } from '../../models/Objava';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  querySubject:Subject<string>=new Subject<string>();
  queryText:string='';
  isOpen=false;
  objave:Objava[]=[];

  constructor(private store:Store<AppState>,private router:Router){
    
  }

  ngOnInit(): void {
    this.querySubject.pipe(
      debounceTime(300),
      filter(value=>value.length>3)
    ).subscribe(next=>{
      this.querySearchFunction(next);
    });
    
    this.store.select(selectQueryObjaveAsArray).subscribe(next=>{
      this.objave=next;
    })
  }

  triggerSearchBar(){
    if(this.isOpen){
      this.isOpen=false;
    }
    else{
      this.isOpen=true;
    }
  }

  onQueryInput($event:any){
    this.querySubject.next(this.queryText);
  }

  querySearchFunction(searchValue:string){
    this.store.dispatch(QueryActions.searchObjave({queryText:searchValue}));
  }

  onDataClick(id:string){
    this.store.dispatch(QueryActions.viewObjavaAction({oid:id}));
  }
}
