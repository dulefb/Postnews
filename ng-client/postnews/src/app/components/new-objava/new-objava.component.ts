import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { User } from '../../models/User';
import { Objava } from '../../models/Objava';
import * as ObjaveActions from '../../store/objave.actions';

@Component({
  selector: 'app-new-objava',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './new-objava.component.html',
  styleUrl: './new-objava.component.css'
})
export class NewObjavaComponent implements OnInit{

  name:string = '';
  text:string = '';
  picture:string = '';
  tags:string = '';
  author:User = new User();

  constructor(private store:Store<AppState>){

  }
  
  ngOnInit(): void {
      this.store.select(selectUserObject).subscribe(next=>{
        this.author=next;
      })
  }

  loadPicture($event:any){
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.picture=<string>reader.result;
    };
  }

  onSubmit($event:any){
    const objava:Objava={
      _id:'',
      name:this.name,
      text:this.text,
      picture:this.picture,
      tags:this.tags.split(','),
      author:this.author,
      likes:[]
    }
    this.store.dispatch(ObjaveActions.postObjava({objava:objava,email:this.author.email}));
  }
}
