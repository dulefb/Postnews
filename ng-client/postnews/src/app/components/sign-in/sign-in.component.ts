import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import * as UserActions from '../../store/user.actions'
import { last } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-sign-in',
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
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  firstname:string='';
  lastname:string='';
  email:string='';
  password:string='';

  firstnameFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('',[Validators.required]);
  emailFormControl = new FormControl('',[Validators.required,Validators.email]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(8)]);

  constructor(private store:Store<AppState>){
    
  }

  ngOnInit(): void {
  }

  signinSubmit($event: MouseEvent) {
    let user = new User();
    user.name=this.firstname;
    user.lastname=this.lastname;
    user.email=this.email;
    user.password=this.password;

    if(user){
      this.store.dispatch(UserActions.signin({user}));
    }
  }

}
