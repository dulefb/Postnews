import { Component, OnInit } from '@angular/core';
import { Objava } from '../../models/Objava';
import { ObjavaSingleComponent } from "../objava-single/objava-single.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectObjave } from '../../store/objave.selectors'
import * as ObjaveActions from '../../store/objave.actions'
import { User } from '../../models/User';
import { selectUserObject } from '../../store/user.selectors';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-objave-feed',
  standalone: true,
  imports: [ObjavaSingleComponent,CommonModule,RouterOutlet],
  templateUrl: './objave-feed.component.html',
  styleUrl: './objave-feed.component.css'
})
export class ObjaveFeedComponent implements OnInit{

  user:User;
  objave$?:Objava[];

  constructor(private store:Store<AppState>){
    this.user=new User();
  }

  ngOnInit() : void{
    this.store.select(selectUserObject).subscribe(next=>this.user=next);
    this.store.dispatch(ObjaveActions.loadObjave({tags:this.user.tags}));
    this.store.select(selectObjave).subscribe(next=>{
      if(next)
        this.objave$=next;
    });
  }
}
