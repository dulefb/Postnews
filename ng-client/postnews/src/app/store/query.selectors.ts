import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { query } from "express";
import { Objava } from "../models/Objava";

export const selectQueryObjave = createSelector(
    (state:AppState)=>state.queryState,
    queryState=>queryState.entities
)
export const selectQueryObjaveAsArray = createSelector(
    selectQueryObjave,
    (query)=><Objava[]>Object.values(query)
)

export const selectObjavaSelectedID = createSelector(
    (state:AppState)=>state.queryState,
    (queryState)=>queryState.selectedObjavaID
)

export const selectViewObjava = createSelector(
    selectQueryObjave,
    selectObjavaSelectedID,
    (objave,id)=>objave[id]
)

export const selectViewObjava2 = createSelector(
    selectQueryObjaveAsArray,
    selectObjavaSelectedID,
    (objave,id)=>objave.find(value=>value._id===id)
)