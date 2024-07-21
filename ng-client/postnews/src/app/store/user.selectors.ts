import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectUser = createSelector(
    (state:AppState)=>state.user$,
    (user$)=>user$
)

export const selectUserPosts = createSelector(
    selectUser,
    (user$)=>user$.currentUserPost$
)