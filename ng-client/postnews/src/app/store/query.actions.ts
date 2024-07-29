import { createAction,props } from "@ngrx/store";
import { Objava } from "../models/Objava";

export const clickedTarget = createAction(
    'Clicked target',
    props<{
        targetClassName:string
    }>()
)

export const searchObjave = createAction(
    'Search objave action',
    props<{
        queryText:string
    }>()
);

export const searchObjaveSuccess = createAction(
    'Search objace action succes',
    props<{
        objave:Objava[]
    }>()
);