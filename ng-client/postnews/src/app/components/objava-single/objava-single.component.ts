import { Component, Input, OnInit } from '@angular/core';
import { Objava } from '../../models/Objava';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ObjaveActions from '../../store/objave.actions'
import { selectObjave } from '../../store/objave.selectors';
import { nextTick } from 'process';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-objava-single',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
  ],
  templateUrl: './objava-single.component.html',
  styleUrl: './objava-single.component.css'
})
export class ObjavaSingleComponent implements OnInit {

  @Input()
  objava: Objava = new Objava();

  @Input()
  user?:User;

  constructor(private store:Store<AppState>){

  }

  ngOnInit(): void {
      
  }

  onLike(){
    if(this.user && this.objava){
      this.store.dispatch(ObjaveActions.likeObjava({email:this.user.email,oid:this.objava._id}));
    }
  }

  onDislike(){
    if(this.user && this.objava){
      this.store.dispatch(ObjaveActions.dislikeObjava({email:this.user.email,oid:this.objava._id}));
    }
  }

  onChange() {
    this.store.dispatch(ObjaveActions.loadObjavaChangeID({objava:this.objava}));
  }

  onDelete() {
    const confirmationDelete = confirm("Are you sure you want to delete this post?");
    if(confirmationDelete){
      this.store.dispatch(ObjaveActions.deleteObjava({objava:this.objava}));
    }
  }
}
