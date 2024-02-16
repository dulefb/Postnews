import { setUpLogin } from "./loginEvents";
import { drawLogin, drawSignup, userFilter } from "./drawFunctions";
import { User } from "../classes/User";
import { Subject, interval, switchMap, takeLast, timer } from "rxjs";
import { addObservableForSearch, getObjaveByTagsEvent, getObjaveEvent, hideSearchBar, toggleSearchBar } from "./pocetnaEvents";

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
    addObservableForSearch();

    window.onclick = function(event) {
        // if (!(event.target as Element).matches("a[href='recepti']")) {
        //     const dropdown_container = document.querySelector(".dropdown-content");
        //     const dropdowns = document.querySelectorAll(".dropdown-content-links");
        //     if(dropdowns.length > 0)
        //     {
        //         dropdowns.forEach(value=>{
        //             dropdown_container.removeChild(value);
        //         });
        //     }
        // }
        if(!(event.target as Element).matches("a[href='#search-input']") && !(event.target as Element).matches("#header-search-input")/* && !(event.target as Element).matches("#search-bar-button")*/){
            hideSearchBar();
        }
    }
}