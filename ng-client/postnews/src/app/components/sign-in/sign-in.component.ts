import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import * as UserActions from '../../store/user.actions'
import { last } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  firstname:string='';
  lastname:string='';
  email:string='';
  password:string='';

  constructor(private store:Store<AppState>){
    
  }

  ngOnInit(): void {
  }

  signinSubmit($event: SubmitEvent) {
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
