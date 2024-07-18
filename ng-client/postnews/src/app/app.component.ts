import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjaveFeedComponent } from './components/objave-feed/objave-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { User } from './models/User';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ObjaveFeedComponent,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    StoreModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'postnews';
  user?:User;

  constructor(){
    
  }

  ngOnInit(): void {
    
  }
}
