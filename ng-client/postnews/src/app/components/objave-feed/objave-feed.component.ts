import { Component, OnInit } from '@angular/core';
import { ObjaveServiceService } from '../../services/objave-service/objave-service.service';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { Objava } from '../../models/Objava';
import { ObjavaSingleComponent } from "../objava-single/objava-single.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';
import { selectUser } from '../../store/user.selectors';
import { AppState } from '../../app.state';
import { state } from '@angular/animations';

@Component({
  selector: 'app-objave-feed',
  standalone: true,
  imports: [ObjavaSingleComponent,CommonModule,RouterOutlet],
  templateUrl: './objave-feed.component.html',
  styleUrl: './objave-feed.component.css'
})
export class ObjaveFeedComponent implements OnInit{

  user?:User;
  objave$ :Objava[];
  constructor(private objavaService:ObjaveServiceService,private store:Store<AppState>){
    this.objave$=[];
  }

  ngOnInit() : void{
    
  }
}
