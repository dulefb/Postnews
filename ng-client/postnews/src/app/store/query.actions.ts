import { createAction,props } from "@ngrx/store";
import { Objava } from "../models/Objava";

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

export const viewObjavaAction = createAction(
    'View objava action',
    props<{oid:string}>()
);

export const likeObjava = createAction(
    'Like query objava action',
    props<{
        oid:string,
        email:string
    }>()
);

export const likeObjavaSuccess = createAction(
    'Like query objava action success',
    props<{
        oid:string,
        likes:string[]
    }>()
);
export const dislikeObjava = createAction(
    'Dislike query objava action',
    props<{
        email:string,
        oid:string
    }>()
);
export const dislikeObjavaSuccess = createAction(
    'Dislike query objava action success',
    props<{
        oid:string,
        likes:string[]
    }>()
);