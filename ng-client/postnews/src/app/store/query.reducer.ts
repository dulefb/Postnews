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
    selectedObjavaID:''
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
            selectedObjavaID:oid
        }
    }),
    on(QueryActions.likeObjava,(state,{oid,email})=>{
        return state;
    }),
    on(QueryActions.likeObjavaSuccess,(state,{oid,likes})=>{
        return queryAdapter.updateOne({
            id:oid,
            changes:{
                likes
            }
        },state)
    }),
    on(QueryActions.dislikeObjava,(state,{email,oid})=>{
        return state;
    }),
    on(QueryActions.dislikeObjavaSuccess,(state,{oid,likes})=>{
        return queryAdapter.updateOne({
            id:oid,
            changes:{
                likes
            }
        },state)
    }),
)