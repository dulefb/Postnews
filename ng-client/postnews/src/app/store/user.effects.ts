import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserServiceService } from "../services/user-service/user-service.service";
import * as UserActions from "../store/user.actions"
import { catchError, concatMap, exhaustMap, map, tap } from "rxjs";
import { User } from "../models/User";
import { Route, Router } from "@angular/router";
import { DBResponse } from "../models/DBResponse";
import { validateHeaderName } from "http";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UserEffects {

    constructor(private userService:UserServiceService,private action$:Actions,private router:Router){ }

    loadUser = createEffect(()=>this.action$.pipe(
            ofType(UserActions.login),
            exhaustMap((action)=>this.userService.getUser(action.email,action.password).pipe(
                map(value=>UserActions.loginSucces({user:value.data})),
                catchError((value:HttpErrorResponse)=>{
                    alert(value.error.message);
                    throw new Error(value.error.message);
                })
            )
        ),
        tap(()=>{
            this.router.navigateByUrl('/');
            alert("Login success");
        })
    ));

    signinUser = createEffect(()=>this.action$.pipe(
        ofType(UserActions.signin),
        exhaustMap((action)=>this.userService.postUser(action.user).pipe(
            map(value=>{
                return UserActions.signinSuccess({response:value})
            }),
            catchError((value:HttpErrorResponse)=>{
                alert(value.error.message);
                throw new Error(value.error.message);
            })
        )),
        tap(()=>{
            this.router.navigateByUrl('/');
            alert("Sign in success");
        })
    ))
}