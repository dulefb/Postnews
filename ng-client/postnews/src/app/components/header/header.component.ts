import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ActionsSubject, select, Store } from '@ngrx/store';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { filter, map, Observable, of } from 'rxjs';
import { AppState } from '../../app.state';
import * as UserActions from '../../store/user.actions';
import * as ObjaveActions from '../../store/objave.actions'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user$:Observable<User>=of();
  user?:User;
  constructor(private store:Store<AppState>){

  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(next=>{
      this.user=next.currentUserObj;
    });
  }

  onProfile(){
    console.log(this.user);
  }

  onLogout(){
    this.store.dispatch(UserActions.logout());
  }

  onPocetna(){
    // console.log(this.user?.tags);
    if(this.user?.tags)
      this.store.dispatch(ObjaveActions.loadObjave({tags:this.user.tags}));
  }
}
