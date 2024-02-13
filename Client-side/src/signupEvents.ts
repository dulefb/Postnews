import { Subject, fromEvent, debounceTime, map, takeUntil, combineLatest, from, switchMap, delay, Observable } from "rxjs";
import { User } from "../classes/User";
import { getUserWithEmail, getUserWithEmailAndPassword, postUser } from "./dbServices";


export function setUpSignin(){

    const user = new User();

    document.querySelector(".signupButton").addEventListener("click",()=>{
            user.name=(<HTMLInputElement>document.querySelector("#signup-name")).value;
            user.lastname=(<HTMLInputElement>document.querySelector("#signup-lastname")).value;
            user.email=(<HTMLInputElement>document.querySelector("#signup-email")).value;
            user.password=(<HTMLInputElement>document.querySelector("#signup-password")).value;
        if(user.name==="" || user.lastname==="" || user.email==="" || user.password===""){
                alert("Morate da unesete sva polja...");
            }
            else{
                postUser(user)
                    .subscribe(postNext=>{
                        console.log(postNext);
                        if(!postNext.valid){
                            alert(postNext.message);
                        }
                        else{
                            sessionStorage.setItem("current-user",JSON.stringify(user));
                            alert(postNext.message);
                            document.location.reload();
                        }
                    }); 
            }
    });
}

function disableSignup(){
    let btn = <HTMLButtonElement>document.querySelector(".signupButton");
    btn.disabled=true;
}

function enableSignup(){
    let btn = <HTMLButtonElement>document.querySelector(".signupButton");
    btn.disabled=false;
}