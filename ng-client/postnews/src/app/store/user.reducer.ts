import { createReducer, on } from "@ngrx/store";
import * as UserActions from "../store/user.actions"
import { state } from "@angular/animations";
import { UserState } from "../store/user.actions";
import { User } from "../models/User";


export const initialState : UserState = {
    currentUserPost$: [],
    currentUserObj: new User()
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.login,(state,{email,password})=>{
        return{
            ...state,
            currentUserEmail:email,
            currentUserPassword:password
        }
    }),
    on(UserActions.loginSucces,(state,{user})=>{
        return {
            ...state,
            currentUserObj:user
        }
    })
)