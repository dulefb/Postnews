import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserServiceService } from "../services/user-service/user-service.service";
import * as ObjaveActions from "../store/objave.actions"
import { catchError, concatMap, exhaustMap, map, tap } from "rxjs";
import { User } from "../models/User";
import { Route, Router } from "@angular/router";
import { DBResponse } from "../models/DBResponse";
import { validateHeaderName } from "http";
import { HttpErrorResponse } from "@angular/common/http";
import { ObjaveServiceService } from "../services/objave-service/objave-service.service";
// import { error } from "console";

@Injectable()
export class ObjaveEffects {

    constructor(private objaveService:ObjaveServiceService,private action$:Actions,private router:Router){ }

    loadObjave = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.loadObjave),
        exhaustMap((action)=>this.objaveService.getObjave(action.tags).pipe(
            map(value=>ObjaveActions.loadObjaveSuccess({objave:value.data})),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message)
                throw new Error(err.error.message);
            })
        ))
    ))
}