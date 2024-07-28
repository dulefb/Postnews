import { createReducer, on } from "@ngrx/store";
import * as QueryActions from '../store/query.actions';
import e from "express";

export interface QueryState{
    targetClassName:string
}

const initialState:QueryState ={
    targetClassName:''
}

export const queryReducer = createReducer(
    initialState,
    on(QueryActions.clickedTarget,(state,{targetClassName})=>{
        return{
            ...state,
            targetClassName:targetClassName
        }
    })
)