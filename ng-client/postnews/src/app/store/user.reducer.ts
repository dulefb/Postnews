import { createReducer, on } from "@ngrx/store";
import * as UserActions from "../store/user.actions"
import { state } from "@angular/animations";
import { UserState } from "../store/user.actions";
import { User } from "../models/User";


export const initialState : UserState = {
    currentUserEmail:'',
    currentUserPassword:'',
    currentUserPost$: [],
    currentUserObj: new User()
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.login,(state,{email,password})=>{
        return{
            ...state
        }
    }),
    on(UserActions.loginSucces,(state,{user})=>{
        return {
            ...state,
            currentUserEmail:user.email,
            currentUserPassword:user.password,
            currentUserObj:user
        }
    }),
    on(UserActions.logout,(state)=>{
        return{
            ...state,
            currentUserEmail:'',
            currentUserPassword:'',
            currentUserPost$:[],
            currentUserObj:new User()
        }
    }),
    on(UserActions.signin,(state,{user})=>{
        return{
            ...state,
            currentUserEmail:user.email,
            currentUserPassword:user.password,
            currentUserObj:user
        }
    }),
    on(UserActions.signinSuccess,(state,{response})=>{
        return{
            ...state,
            currentUserObj:response.data,
            currentUserEmail:response.data.email,
            currentUserPassword:response.data.password
        }
    })
)