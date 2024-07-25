import { createAction,props } from "@ngrx/store";
import { Objava } from "../models/Objava";

export const loadObjave = createAction(
    'Load objave feed',
    props<{tags:string[]}>()
);
export const loadObjaveSuccess = createAction(
    'Load objave feed success',
    props<{objave:Objava[]}>()
)
export const loadObjaveFromUser = createAction(
    'Load objave from user',
    props<{email:string}>()
);
export const loadObjaveFromUserSuccess = createAction(
    'Load objave from user succes',
    props<{objave:Objava[]}>()
);