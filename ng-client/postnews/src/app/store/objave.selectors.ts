import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Objava } from "../models/Objava";

export const selectObjave = createSelector(
    (state:AppState)=>state.objaveState,
    (objaveState)=>objaveState.ids.map(id=>objaveState.entities[id]).filter(objava=>objava!=null).map(obj=><Objava>obj)
    // (objavaState)=><Objava[]>Object.values(objavaState.entities)
)