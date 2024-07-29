import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser, selectUserObject } from '../../store/user.selectors';
import { User } from '../../models/User';
import { Objava } from '../../models/Objava';
import * as ObjaveActions from '../../store/objave.actions';
import { ActivatedRoute } from '@angular/router';
import { selectObjavaForChange } from '../../store/objave.selectors';

@Component({
  selector: 'app-change-objava',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
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
      likes:[]
    };

    this.store.dispatch(ObjaveActions.changeObjava({objava:objavaChange}));
  }
}
