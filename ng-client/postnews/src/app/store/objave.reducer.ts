import { createReducer, on } from "@ngrx/store";
import * as ObjaveActions from '../store/objave.actions'
import { state } from "@angular/animations";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Objava } from "../models/Objava";
import { stat } from "fs";


export interface ObjaveState extends EntityState<Objava>{
    tags:string[]
}

export const objaveAdapter = createEntityAdapter<Objava>();

export const objaveReducer = createReducer(
    objaveAdapter.getInitialState({tags:['']}),
    on(ObjaveActions.loadObjave,(state,{tags})=>{
        return{
            ...state,
            tags:tags
        }
    }),
    on(ObjaveActions.loadObjaveSuccess,(state,{objave})=>{
        return objaveAdapter.addMany(objave,state);
    })
)