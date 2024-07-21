import { createReducer, on } from "@ngrx/store";
import * as UserActions from "../store/user.actions"
import { state } from "@angular/animations";
import { UserState } from "../store/user.actions";


export const initialState : UserState = {
    currentUserEmail:'',
    currentUserPassword:'',
    currentUserPost$:[]
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.login,(state,{email,password})=>{
        return{
            ...state,
            currentUserEmail:email,
            currentUserPassword:password
        }
    })
)