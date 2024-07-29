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

export const likeObjava = createAction(
    'Like objava action',
    props<{
        email:string,
        oid:string
    }>()
);
export const likeObjavaSuccess = createAction(
    'Like objava action success',
    props<{
        oid:string,
        likes:string[]
    }>()
);
export const dislikeObjava = createAction(
    'Dislike objava action',
    props<{
        email:string,
        oid:string
    }>()
);
export const dislikeObjavaSuccess = createAction(
    'Dislike objava action success',
    props<{
        oid:string,
        likes:string[]
    }>()
);

export const postObjava = createAction(
    'Post objava action',
    props<{
       objava:Objava 
    }>()
);

export const postObjavaSucces = createAction(
    'Post objava action success'
);