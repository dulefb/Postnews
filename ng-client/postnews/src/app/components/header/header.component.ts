import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ActionsSubject, Store } from '@ngrx/store';
import { selectUser } from '../../store/user.selectors';
import { filter, map } from 'rxjs';
import { AppState } from '../../app.state';
import * as UserActions from '../../store/user.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input()
  user?:User;

  constructor(private store:Store<AppState>,private actionsSubject:ActionsSubject){
    
  }

  ngOnInit(): void {
    
  }
}
