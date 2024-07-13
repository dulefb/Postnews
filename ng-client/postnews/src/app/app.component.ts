import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjaveFeedComponent } from './components/objave-feed/objave-feed.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ObjaveFeedComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'postnews';
  
  constructor(){}

  ngOnInit(): void {
    
  }
}
