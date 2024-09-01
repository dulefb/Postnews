import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserServiceService } from "../services/user-service/user-service.service";
import * as QueryActions from "../store/query.actions"
import { catchError, concatMap, exhaustMap, map, tap } from "rxjs";
import { User } from "../models/User";
import { Route, Router } from "@angular/router";
import { DBResponse } from "../models/DBResponse";
import { validateHeaderName } from "http";
import { HttpErrorResponse } from "@angular/common/http";
import { ObjaveServiceService } from "../services/objave-service/objave-service.service";

@Injectable()
export class QueryEffects {

    constructor(private objaveService:ObjaveServiceService,private action$:Actions,private router:Router){ }

    querySearch = createEffect(()=>this.action$.pipe(
        ofType(QueryActions.searchObjave),
        exhaustMap((action)=>this.objaveService.querySearchObjave(action.queryText).pipe(
            map(value=>QueryActions.searchObjaveSuccess({objave:value.data}))
        )),
        catchError((err:HttpErrorResponse)=>{
            alert(err.error.message);
            throw new Error(err.error.message);
        }),
        tap(()=>{
            //if something additional needs to be done...
        })
    ));

    likeObjava = createEffect(()=>this.action$.pipe(
        ofType(QueryActions.likeObjava),
        exhaustMap((action)=>this.objaveService.likeObjava(action.email,action.oid).pipe(
            map(value=>{
                console.log(value);
                return QueryActions.likeObjavaSuccess({oid:value.data._id,likes:value.data.likes})
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        ))
    ));

    dislikeObjava = createEffect(()=>this.action$.pipe(
        ofType(QueryActions.dislikeObjava),
        exhaustMap((action)=>this.objaveService.dislikeObjava(action.email,action.oid).pipe(
            map(value=>{
                return QueryActions.dislikeObjavaSuccess({oid:value.data._id,likes:value.data.likes})
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        ))
    ));
}