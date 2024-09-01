import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as UserActions from '../../store/user.actions'
import { User } from '../../models/User';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatBadgeModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  userEmail = '';
  userPassword = '';
  emailFormControl = new FormControl('',[Validators.required,Validators.email]);
  passwordFormControl = new FormControl('',[Validators.required]);

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
