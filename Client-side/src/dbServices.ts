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
    let formBody = new URLSearchParams();
    formBody.append('name',objava.name);
    formBody.append('text',objava.text);
    formBody.append('picture',objava.picture);
    formBody.append('tags',JSON.stringify(objava.tags));
    formBody.append('likes',JSON.stringify(objava.likes));
    formBody.append('author',objava.author);

    const resp=fetch(objavaURL,
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

export function getObjave():Observable<any>{
    const resp = fetch(objavaURL,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function getObjaveByTags():Observable<any>{
    const resp = fetch(objavaURL+"?tags=true",{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function changeObajava(objavaID:string,text:string,picture:string):Observable<any>{
    let formBody = new URLSearchParams();
    formBody.append('id',objavaID);
    formBody.append('text',text);
    formBody.append('picture',picture)
    const resp = fetch(objavaURL,
                    {
                        method:"PUT",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    })
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function deleteObjava(objavaID:string):Observable<any>{
    const resp = fetch(objavaURL+"?id="+objavaID,{method:"DELETE"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

// export function reactOnObjava(user:User,objavaID:string):Observable<any>{
    
// }

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