import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectTarget = createSelector(
    (state:AppState)=>state.queryState,
    (queryState)=>queryState.targetClassName
)