import { ObjaveState } from "./models/ObjaveState";
import { UserState } from "./store/user.actions";


export interface AppState{
    userState:UserState
    objaveState:ObjaveState
    //queryState:QueryState
}