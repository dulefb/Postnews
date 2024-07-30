import { Component, Input, OnInit } from '@angular/core';
import { Objava } from '../../models/Objava';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ObjaveActions from '../../store/objave.actions'
import { selectObjave } from '../../store/objave.selectors';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { selectObjavaSelectedID, selectQueryObjave, selectQueryObjaveAsArray, selectViewObjava, selectViewObjava2 } from '../../store/query.selectors';
import { selectUserObject } from '../../store/user.selectors';
import { Observable, of } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent implements OnInit{

  user:User=new User();
  objave$:Objava[]=[];
  objava:Objava=new Objava();
  selectedID:string='';
  constructor(private store:Store<AppState>,private route:ActivatedRoute){

  }

  ngOnInit(): void {

    this.selectedID=String(this.route.snapshot.params['id']);
    this.store.select(selectUserObject).subscribe(next=>{
      if(next){
        this.user=next;
      }
    });

    this.store.select(selectQueryObjaveAsArray).subscribe(next=>{
      this.objave$=next;
      let obj = this.objave$.find(value=>value._id===this.selectedID);
      if(obj)
        this.objava=obj;
    });

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
}
