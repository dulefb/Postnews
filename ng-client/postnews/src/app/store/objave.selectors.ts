import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Objava } from "../models/Objava";
import { Dictionary } from "@ngrx/entity";
import { selectUserObject } from "./user.selectors";


export const selectObjaveDictionary = createSelector(
    (state:AppState)=>state.objaveState.entities,
    (dict)=>dict
)
export const selectObjave = createSelector(
    (state:AppState)=>state.objaveState,
    (objaveState)=>objaveState.ids.map(id=>objaveState.entities[id]).filter(objava=>objava!=null).map(obj=><Objava>obj)
    // (objavaState)=><Objava[]>Object.values(objavaState.entities)
)

export const selectObjavaChangeID = createSelector(
    (state:AppState)=>state.objaveState,
    (objavaState)=>objavaState.selectObjavaID
)

export const selectObjavaForChange = createSelector(
    selectObjaveDictionary,
    selectObjavaChangeID,
    (objave,id)=>objave[id]
)
