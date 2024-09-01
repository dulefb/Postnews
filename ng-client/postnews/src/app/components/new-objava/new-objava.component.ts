import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { User } from '../../models/User';
import { Objava } from '../../models/Objava';
import * as ObjaveActions from '../../store/objave.actions';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-new-objava',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatBadgeModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    ReactiveFormsModule
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

  nameFormControl = new FormControl('',[Validators.required]);
  textFormControl = new FormControl('',[Validators.required]);
  pictureFormControl = new FormControl('',[Validators.required]);
  tagsFormControl = new FormControl('',[Validators.required]);

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
