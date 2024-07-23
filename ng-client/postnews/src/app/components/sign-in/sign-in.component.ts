import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import * as UserActions from '../../store/user.actions'

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
  
  user?:User;

  constructor(private store:Store<AppState>){
    
  }

  ngOnInit(): void {
    this.user=new User();
  }

  signinSubmit($event: SubmitEvent) {
    if(this.user){
      this.store.dispatch(UserActions.signin({user:this.user}));
    }
  }

}
