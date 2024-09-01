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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ObjaveFeedComponent,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    StoreModule,
    MatFormFieldModule, 
    MatInputModule,
    MatBadgeModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
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
