import { createAction,props } from "@ngrx/store";

export const loadObjave = createAction("Load objave feed");
export const loadObjaveFromUser = createAction(
    "Load objave from user",
    props<{email:string}>()
)