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
import { error } from "console";
// import { error } from "console";

@Injectable()
export class ObjaveEffects {

    constructor(private objaveService:ObjaveServiceService,private action$:Actions,private router:Router){ }

    loadObjave = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.loadObjave),
        exhaustMap((action)=>this.objaveService.getObjave(action.tags).pipe(
            map(value=>{
                // alert(value.message);
                return ObjaveActions.loadObjaveSuccess({objave:value.data})
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        ))
    ));

    likeObjava = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.likeObjava),
        exhaustMap((action)=>this.objaveService.likeObjava(action.email,action.oid).pipe(
            map(value=>{
                return ObjaveActions.likeObjavaSuccess({oid:value.data.oid,likes:value.data.likes})
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        ))
    ));

    dislikeObjava = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.dislikeObjava),
        exhaustMap((action)=>this.objaveService.dislikeObjava(action.email,action.oid).pipe(
            map(value=>{
                return ObjaveActions.dislikeObjavaSuccess({oid:value.data.oid,likes:value.data.likes})
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        ))
    ));

    objaveFromUser = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.loadObjaveFromUser),
        exhaustMap((action)=>this.objaveService.getObjaveFromUser(action.email).pipe(
            map(value=>{
                // console.log(value);
                return ObjaveActions.loadObjaveFromUserSuccess({objave:value.data});
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        ))
    ));

    postObjava = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.postObjava),
        exhaustMap((action)=>this.objaveService.postObjava(action.objava).pipe(
            map(value=>{
                alert(value.message);
                return ObjaveActions.postObjavaSucces();
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        )),
        tap(()=>{
            this.router.navigateByUrl('');
        })
    ));

    deleteObjavaEffect = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.deleteObjava),
        exhaustMap((action)=>this.objaveService.deleteObjava(action.objava._id).pipe(
            map(value=>{
                alert(value.message);
                return ObjaveActions.deleteObjavaSuccess({objava:value.data});
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        )),
        tap(()=>{
            this.router.navigateByUrl('profile');
        })
    ));

    changeObjavaEffect = createEffect(()=>this.action$.pipe(
        ofType(ObjaveActions.changeObjava),
        exhaustMap((action)=>this.objaveService.changeObjava(action.objava).pipe(
            map(value=>{
                alert(value.message);
                return ObjaveActions.changeObjavaSuccess({objava:value.data});
            }),
            catchError((err:HttpErrorResponse)=>{
                alert(err.error.message);
                throw new Error(err.error.message);
            })
        )),
        tap(()=>{
            this.router.navigateByUrl('profile');
        })
    ))
}