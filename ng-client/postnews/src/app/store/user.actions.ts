import { createAction, props } from "@ngrx/store";
import { User } from "../models/User";
import { Objava } from "../models/Objava";
import { DBResponse } from "../models/DBResponse";

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

export const loginFail = createAction(
    'Log in user failed action',
    props<{response:DBResponse}>()
);

export const logout = createAction(
    'Log out user action'
);

export const signin = createAction(
    'Sign in user action',
    props<{user:User}>()
);

export const signinSuccess = createAction(
    'Sign in user success action',
    props<{response:DBResponse}>()
);

export const signinFail = createAction(
    'Sign in user failed action',
    props<{response:DBResponse}>
)