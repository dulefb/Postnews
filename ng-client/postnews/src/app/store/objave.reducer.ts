import { createReducer, on } from "@ngrx/store";
import * as ObjaveActions from '../store/objave.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Objava } from "../models/Objava";


export interface ObjaveState extends EntityState<Objava>{
    tags:string[]
}

export const objaveAdapter = createEntityAdapter<Objava>({
    selectId:(obj:Objava)=>obj._id
});
export const initialState = objaveAdapter.getInitialState({tags:['']});
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
    })
)