import { createAction,props } from "@ngrx/store";

export const clickedTarget = createAction(
    'Clicked target',
    props<{targetClassName:string}>()
)