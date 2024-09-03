import { createReducer, on } from "@ngrx/store";
import * as ObjaveActions from '../store/objave.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Objava } from "../models/Objava";
import { state } from "@angular/animations";


export interface ObjaveState extends EntityState<Objava>{
    tags:string[],
    selectObjavaID:string
}

export const objaveAdapter = createEntityAdapter<Objava>({
    selectId:(obj:Objava)=>obj._id
});
export const initialState = objaveAdapter.getInitialState({tags:[''],selectObjavaID:''});
export const objaveReducer = createReducer(
    initialState,
    on(ObjaveActions.loadObjave,(state,{tags})=>{
        return{
            ...state,
            tags:tags
        }
    }),
    on(ObjaveActions.loadObjaveSuccess,(state,{objave})=>{
        return objaveAdapter.addMany(objave,state);
    }),
    on(ObjaveActions.likeObjava,(state,{email,oid})=>{
        return state;
    }),
    on(ObjaveActions.likeObjavaSuccess,(state,{oid,likes})=>{
        return objaveAdapter.updateOne({
            id:oid,
            changes:{
                likes
            }
        },state)
    }),
    on(ObjaveActions.dislikeObjava,(state,{email,oid})=>{
        return state;
    }),
    on(ObjaveActions.dislikeObjavaSuccess,(state,{oid,likes})=>{
        return objaveAdapter.updateOne({
            id:oid,
            changes:{
                likes
            }
        },state)
    }),
    on(ObjaveActions.loadObjaveFromUser,(state,{email})=>{
        return state;
    }),
    on(ObjaveActions.loadObjaveFromUserSuccess,(state,{objave})=>{
        return objaveAdapter.setAll(objave,state);
    }),
    on(ObjaveActions.postObjava,(state,{objava})=>state),
    on(ObjaveActions.postObjavaSucces,(state)=>{
        return state;
    }),
    on(ObjaveActions.deleteObjava,(state,{objava})=>{
        return state
    }),
    on(ObjaveActions.deleteObjavaSuccess,(state,{objava})=>{
        return objaveAdapter.removeOne(objava._id,state);
    }),
    on(ObjaveActions.loadObjavaChangeID,(state,{objava})=>{
        return {
            ...state,
            selectObjavaID:objava._id
        }
    }),
    on(ObjaveActions.changeObjava,(state,{objava})=>{
        return state;
    }),
    on(ObjaveActions.changeObjavaSuccess,(state,{objava})=>{
        return objaveAdapter.setOne(objava,state);
    }),
    on(ObjaveActions.postComment,(state,{objavaId,comment})=>{
        return state;
    }),
    on(ObjaveActions.postCommentSuccess,(state,{objavaId,comments})=>{
        return objaveAdapter.updateOne({
            id:objavaId,
            changes:{
                comments
            }
        },state);
    }),
    on(ObjaveActions.deleteComment,(state,{objavaId,commentId})=>{
        return state;
    }),
    on(ObjaveActions.deleteCommentSuccess,(state,{objavaId,comments})=>{
        return objaveAdapter.updateOne({
            id:objavaId,
            changes:{
                comments
            }
        },state);
    })
)