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

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ObjavaSingleComponent,CommonModule,RouterOutlet],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

  user:User = new User();
  objaveUser:Objava[] = []

  constructor(private store:Store<AppState>){

  }

  ngOnInit(): void {
    this.store.select(selectUserObject).subscribe(next=>{
      this.user=next;
    });
    this.store.select(selectObjave).subscribe(next=>{
      this.objaveUser=next;
    });
  }

}
