
import { ObjaveState } from "./store/objave.reducer";
import { QueryState } from "./store/query.reducer";
import { UserState } from "./store/user.actions";


export interface AppState{
    userState:UserState
    objaveState:ObjaveState
    queryState:QueryState
}