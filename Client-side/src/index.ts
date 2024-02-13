import { setUpLogin } from "./loginEvents";
import { drawLogin, drawSignup, userFilter } from "./drawFunctions";
import { User } from "../classes/User";
import { Subject, interval, switchMap, takeLast, timer } from "rxjs";
import { hideSearchBar, toggleSearchBar } from "./pocetnaEvents";

document.body.onload=()=>{
    userFilter();
    if(sessionStorage.getItem("current-user")){
        
    }
    document.querySelector("a[href='#pocetna']").addEventListener("click",()=>{
        document.location.reload();
    });

    toggleSearchBar();
}