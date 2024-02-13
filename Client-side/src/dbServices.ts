import { Observable, from, take, takeLast, map, toArray, mergeMap, filter, of } from "rxjs";
import { User } from "../classes/User";
import { DBResponse } from "../classes/DBResponse";
import { Objava } from "../classes/Objava";
import { usersURL, objavaURL } from "./constants";
import { removeChildren } from "./pocetnaEvents";

export function postUser(user:User) : Observable<any>{

    // console.log(user);
    let formBody = new URLSearchParams();
    formBody.append('name',user.name);
    formBody.append('lastname',user.lastname);
    formBody.append('email',user.email);
    formBody.append('password',user.password);
    formBody.append('content',null);

    const resp=fetch(usersURL,
                {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body: formBody
                }).then(response=>{
                    response.json();
                }).catch(err=>console.log(err));

    return from(resp);
}

export function getUser(email:string) : Observable<User>{
    const user = fetch(usersURL+"?email="+email,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user).pipe(take(1));
}

export function getUserWithEmail(email:string) : Observable<any>{
    const user = fetch(usersURL+"?email="+email,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user);
}

export function getUserWithEmailAndPassword(email:string,password:string) : Observable<any>{
    const user = fetch(usersURL+"?email="+email+"&password="+password,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user);
}

export function deleteUser(email:string) : Observable<any>{
    const user = fetch(usersURL+"?email="+email,{method:"DELETE"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user);
}

export function postObjava(objava:Objava) : Observable<any>{

}

export function getObjave():Observable<any>{

}

export function getObjaveByTags():Observable<any>{

}

export function changeObajava(text:string,picture:string):Observable<any>{

}

export function deleteObjava(id:string):Observable<any>{

}

export function reactOnObjava(user:User,objavaID:string):Observable<any>{
    
}

function showError(error:any){
    let parent = document.querySelector(".middle");
    removeChildren(parent,document.querySelectorAll(".middle > div"));
    let divError = document.createElement("div");
    divError.classList.add("divError");
    let labelError = document.createElement("label");
    labelError.style.fontSize="larger";
    labelError.innerHTML=error.toString();
    labelError.innerHTML = labelError.innerHTML.concat(". Error 404.");
    divError.appendChild(labelError);
    parent.appendChild(divError);
}