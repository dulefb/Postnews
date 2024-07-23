import { createAction, props } from "@ngrx/store";
import { User } from "../models/User";
import { Objava } from "../models/Objava";

export interface UserState{
    currentUserEmail:string,
    currentUserPassword:string,
    currentUserObj:User,
    currentUserPost$:Objava[]
}

export const login = createAction(
    'Log in user action',
    props<{email:string,password:string}>()
);
export const loginSucces = createAction(
    'Log in user succes action',
    props<{user:User}>()
);