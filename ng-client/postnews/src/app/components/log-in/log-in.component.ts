import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as UserActions from '../../store/user.actions'
import { User } from '../../models/User';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  userEmail = '';
  userPassword = '';

  constructor(private store:Store<AppState>){
    
  }

  ngOnInit(): void {
    
  }

  loginSubmit(event:any){
    this.store.dispatch(
      UserActions.login({
        email:this.userEmail,
        password:this.userPassword
      })
    )
  }
}
