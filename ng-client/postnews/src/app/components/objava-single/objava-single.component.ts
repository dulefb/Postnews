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
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Comment } from '../../models/Comment';
import { text } from 'stream/consumers';


@Component({
  selector: 'app-objava-single',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './objava-single.component.html',
  styleUrl: './objava-single.component.css'
})
export class ObjavaSingleComponent implements OnInit {

  @Input()
  objava: Objava = new Objava();

  @Input()
  user?:User;

  enableEnterComment = false;
  enterComment:string = '';
  enterCommentFormControl = new FormControl('',[Validators.minLength(1),Validators.maxLength(140)]);

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

  onComment() {
    if(this.enableEnterComment)
      this.enableEnterComment=false;
    else
      this.enableEnterComment=true;

    this.enterComment='';
  }

  submitComment() {
    if(this.user)
      this.store.dispatch(ObjaveActions.postComment({objavaId:this.objava._id,comment:new Comment(this.user?.email,this.enterComment)}));
  }

  deleteComment(objavaId:string,commentId:string){
    if(this.user){
      this.store.dispatch(ObjaveActions.deleteComment({objavaId:objavaId,commentId:commentId}));
    }
  }
}
