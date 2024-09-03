import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { User } from '../../models/User';
import { Objava } from '../../models/Objava';
import * as ObjaveActions from '../../store/objave.actions';
import { ActivatedRoute } from '@angular/router';
import { selectObjavaForChange } from '../../store/objave.selectors';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-change-objava',
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
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './change-objava.component.html',
  styleUrl: './change-objava.component.css'
})
export class ChangeObjavaComponent implements OnInit{

  oid:string='';
  name:string = '';
  text:string = '';
  picture:string = '';
  tags:string = '';
  author:User = new User();
  objava:Objava = new Objava();

  nameFormControl = new FormControl('',[Validators.required]);
  textFormControl = new FormControl('',[Validators.required]);
  tagsFormControl = new FormControl('',[Validators.required]);

  constructor(private store:Store<AppState>,private route:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.store.select(selectUserObject).subscribe(next=>{
      this.author=next;
    });
    this.store.select(selectObjavaForChange).subscribe(next=>{
      if(next){
        this.oid=next._id;
        this.name=next.name;
        this.text=next.text;
        this.picture=next.picture;
        this.tags=next.tags.join(',');
      }
    });
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
    const objavaChange:Objava={
      _id:this.oid,
      name:this.name,
      text:this.text,
      picture:this.picture,
      tags:this.tags.split(','),
      author:this.author,
      likes:[],
      comments:[]
    };

    this.store.dispatch(ObjaveActions.changeObjava({objava:objavaChange}));
  }
}
