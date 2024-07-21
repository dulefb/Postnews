import { User } from "./User";

export interface UserState{
    currentUserEmail:string,
    currentUserPost$:User[]
}