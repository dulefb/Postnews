import { createReducer, on } from "@ngrx/store";
import * as ObjaveActions from '../store/objave.actions'
import { state } from "@angular/animations";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Objava } from "../models/Objava";
import { stat } from "fs";
import { retry } from "rxjs";


export interface ObjaveState extends EntityState<Objava>{
    tags:string[]
    objave:Objava[]
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
        // state.entities[oid]?.likes.push(email);
        // let newLikes = state.entities[oid]?.likes;
        // return objaveAdapter.updateOne({
        //     id:oid,
        //     changes:{
        //         likes:newLikes
        //     }
        // },state);
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
        // state.entities[oid]?.likes.push(email);
        // let newLikes = state.entities[oid]?.likes;
        // return objaveAdapter.updateOne({
        //     id:oid,
        //     changes:{
        //         likes:newLikes
        //     }
        // },state);
        return state;
    }),
    on(ObjaveActions.dislikeObjavaSuccess,(state,{oid,likes})=>{
        return objaveAdapter.updateOne({
            id:oid,
            changes:{
                likes
            }
        },state)
    })
)

/*
on(ObjaveActions.likeObjava,(state,{email,oid})=>{
        return objaveAdapter.updateOne({
            id:oid,
            changes:{
                likes:likes
            }
        },state)
    })
*/