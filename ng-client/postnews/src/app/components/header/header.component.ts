import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ActionsSubject, select, Store } from '@ngrx/store';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { filter, interval, map, Observable, of, Subject } from 'rxjs';
import { AppState } from '../../app.state';
import * as UserActions from '../../store/user.actions';
import * as ObjaveActions from '../../store/objave.actions';
import * as QueryActions from '../../store/query.actions';
import {isPlatformBrowser} from "@angular/common";
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar'
import { MenuItem } from 'primeng/api';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Objava } from '../../models/Objava';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,
    CommonModule,
    FormsModule,
    SearchBarComponent,
    MatCard,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,AfterViewInit {

  user:User = new User();
  isBrowser = signal(false);

  querySubject:Subject<string>=new Subject<string>();
  queryText:string='';
  isOpen=false;
  objave:Objava[]=[];

  constructor(private store:Store<AppState>,@Inject(PLATFORM_ID) platformId: object,private router:Router){
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(next=>{
      this.user=next.currentUserObj;
    });
  }

  ngAfterViewInit(): void {
  }

  onProfile(){
    if(this.user.email)
      this.store.dispatch(ObjaveActions.loadObjaveFromUser({email:this.user.email}))
  }

  onLogout(){
    this.store.dispatch(UserActions.logout());
    sessionStorage.removeItem('userToken');
  }

  onPocetna(){
    if(this.user.tags){
      this.store.dispatch(ObjaveActions.loadObjave({tags:this.user.tags}));
    }
  }

  onNewPost(){
    
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
    this.router.navigateByUrl('/show-details/'+id);
  }
}
