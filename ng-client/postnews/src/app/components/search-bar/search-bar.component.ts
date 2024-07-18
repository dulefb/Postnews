import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import e from 'express';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  isOpen=false;
  constructor(){
    
  }

  ngOnInit(): void {

  }

  triggerSearch(){
    if(this.isOpen)
      this.isOpen=false;
    else
      this.isOpen=true;
  }
}
