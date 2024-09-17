import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ActionsSubject, select, Store } from '@ngrx/store';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { filter, interval, map, Observable, of } from 'rxjs';
import { AppState } from '../../app.state';
import * as UserActions from '../../store/user.actions';
import * as ObjaveActions from '../../store/objave.actions';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,AfterViewInit {

  user:User = new User();
  isBrowser = signal(false)
  constructor(private store:Store<AppState>,@Inject(PLATFORM_ID) platformId: object ){
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(next=>{
      this.user=next.currentUserObj;
    });
  }

  ngAfterViewInit(): void {
    // if(this.isBrowser()){
    //   setInterval(()=>{
    //     this.store.dispatch(ObjaveActions.loadObjaveChanges({tags:this.user.tags}));
    //   },1000);
    // }
  }

  onProfile(){
    if(this.user.email)
      this.store.dispatch(ObjaveActions.loadObjaveFromUser({email:this.user.email}))
  }

  onLogout(){
    this.store.dispatch(UserActions.logout());
  }

  onPocetna(){
    if(this.user.tags){
      this.store.dispatch(ObjaveActions.loadObjave({tags:this.user.tags}));
    }
  }

  onNewPost(){
    
  }
}
