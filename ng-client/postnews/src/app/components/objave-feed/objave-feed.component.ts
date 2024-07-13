import { Component, OnInit } from '@angular/core';
import { ObjaveServiceService } from '../../services/objave-service/objave-service.service';
import { Observable } from 'rxjs';
import { DBResponse } from '../../models/DBResponse';
import { Objava } from '../../models/Objava';
import { ObjavaSingleComponent } from "../objava-single/objava-single.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objave-feed',
  standalone: true,
  imports: [ObjavaSingleComponent,CommonModule],
  templateUrl: './objave-feed.component.html',
  styleUrl: './objave-feed.component.css'
})
export class ObjaveFeedComponent implements OnInit{

  objave$ :Objava[];
  constructor(private objavaService:ObjaveServiceService){
    this.objave$=[];
  }

  ngOnInit() : void{
    this.objavaService.getObajve().subscribe(next=>{
      this.objave$=next.data;
    })
  }
}
