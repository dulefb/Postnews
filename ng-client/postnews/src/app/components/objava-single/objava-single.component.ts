import { Component, Input, OnInit } from '@angular/core';
import { Objava } from '../../models/Objava';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objava-single',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './objava-single.component.html',
  styleUrl: './objava-single.component.css'
})
export class ObjavaSingleComponent implements OnInit {

  @Input()
  objava : Objava;

  constructor(){
    this.objava=new Objava();
  }

  ngOnInit(): void {
      
  }
}
