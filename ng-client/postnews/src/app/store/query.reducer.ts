import { createReducer, on } from "@ngrx/store";
import * as QueryActions from '../store/query.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Objava } from "../models/Objava";

export interface QueryState extends EntityState<Objava>{
    selectedObjavaID:string;
}

export const queryAdapter = createEntityAdapter<Objava>({
    selectId:(objava:Objava)=>objava._id
});

const initialState = queryAdapter.getInitialState({
    selectObjavaID:''
});

export const queryReducer = createReducer(
    initialState,
    on(QueryActions.searchObjave,(state,{queryText})=>{
        return state;
    }),
    on(QueryActions.searchObjaveSuccess,(state,{objave})=>{
        return queryAdapter.setAll(objave,state);
    }),
    on(QueryActions.viewObjavaAction,(state,{oid})=>{
        return{
            ...state,
            selectObjavaID:oid
        }
    })
)