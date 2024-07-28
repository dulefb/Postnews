import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import e from 'express';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectTarget } from '../../store/query.selectors';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  clickedTarget:string='';
  isOpen=false;
  constructor(private store:Store<AppState>){
    
  }

  ngOnInit(): void {
    this.store.select(selectTarget).subscribe(next=>{
      this.clickedTarget=next;
    })
  }

  triggerSearch(){
    if(this.isOpen){
      this.isOpen=false;
    }
    else{
      this.isOpen=true;
    }
  }
}
