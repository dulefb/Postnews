import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserServiceService } from "../services/user-service/user-service.service";
import * as UserActions from "../store/user.actions"
import { concatMap, exhaustMap, map, tap } from "rxjs";
import { User } from "../models/User";
import { Route, Router } from "@angular/router";

@Injectable()
export class UserEffects {

    constructor(private userService:UserServiceService,private action$:Actions,private router:Router){ }

    loadUser = createEffect(()=>this.action$.pipe(
            ofType(UserActions.login),
            exhaustMap((action)=>this.userService.getUser(action.email,action.password).pipe(
                map(value=>UserActions.loginSucces({user:value.data})
            ))
        ),
        tap(()=>{
            this.router.navigateByUrl('/');
            alert("Login success");
        })
    ));
}