import { Component, OnInit, Query } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObjaveFeedComponent } from './components/objave-feed/objave-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { User } from './models/User';
import { Store, StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { AppState } from './app.state';
import * as QueryActions from './store/query.actions'

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

  constructor(private store:Store<AppState>){
    
  }

  ngOnInit(): void {
    
  }

  onMiddleClick($event: MouseEvent) {
    if($event.target){
      // console.log((<HTMLElement>$event.target).className);
    }
  }
}
