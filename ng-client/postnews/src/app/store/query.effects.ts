import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserServiceService } from "../services/user-service/user-service.service";
import * as QueryActions from "../store/objave.actions"
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
}