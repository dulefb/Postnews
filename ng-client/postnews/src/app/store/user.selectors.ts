import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectUser = createSelector(
    (state:AppState)=>state.userState,
    (user$)=>user$
)

export const selectUserObject = createSelector(
    selectUser,
    (user$)=>user$.currentUserObj
)