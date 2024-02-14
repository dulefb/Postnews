import { setUpLogin } from "./loginEvents";
import { drawLogin, drawSignup, userFilter } from "./drawFunctions";
import { User } from "../classes/User";
import { Subject, interval, switchMap, takeLast, timer } from "rxjs";
import { getObjaveByTagsEvent, getObjaveEvent, hideSearchBar, toggleSearchBar } from "./pocetnaEvents";

document.body.onload=()=>{
    userFilter();
    let user;
    if(sessionStorage.getItem("current-user"))
        user = <User>JSON.parse(sessionStorage.getItem("current-user"));
    if(user){
        if(user.tags.length>0){
            getObjaveByTagsEvent(user.tags);
        }
        else{
            getObjaveEvent();
        }
    }
    else{
        getObjaveEvent();
    }
    document.querySelector("a[href='#pocetna']").addEventListener("click",()=>{
        document.location.reload();
    });
    toggleSearchBar();
}