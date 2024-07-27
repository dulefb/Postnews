import { Component, Input, OnInit } from '@angular/core';
import { Objava } from '../../models/Objava';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ObjaveActions from '../../store/objave.actions'

@Component({
  selector: 'app-objava-single',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objava-single.component.html',
  styleUrl: './objava-single.component.css'
})
export class ObjavaSingleComponent implements OnInit {

  @Input()
  objava? : Objava;

  @Input()
  user?:User;

  constructor(private store:Store<AppState>){

  }

  ngOnInit(): void {
      
  }

  onLike(){
    console.log(this.user);
    if(this.user && this.objava){
      this.store.dispatch(ObjaveActions.likeObjava({email:this.user.email,oid:this.objava._id}));
    }
  }

  onDislike(){
    if(this.user && this.objava){
      this.store.dispatch(ObjaveActions.dislikeObjava({email:this.user.email,oid:this.objava._id}));
    }
  }
}
