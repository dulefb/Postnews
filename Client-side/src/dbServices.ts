import { Observable, from, take, takeLast, map, toArray, mergeMap, filter, of } from "rxjs";
import { User } from "../classes/User";
import { DBResponse } from "../classes/DBResponse";
import { Objava } from "../classes/Objava";
import { usersURL, objavaURL, likeURL, dislikeURL } from "./constants";
import { removeChildren } from "./pocetnaEvents";

export function postUser(user:User) : Observable<DBResponse>{

    let formBody = new URLSearchParams();
    formBody.append('name',user.name);
    formBody.append('lastname',user.lastname);
    formBody.append('email',user.email);
    formBody.append('password',user.password);
    formBody.append('content',JSON.stringify(user.content));
    formBody.append('tags',JSON.stringify(user.tags));

    const resp=fetch(usersURL,
                {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body: formBody
                }).then(response=>{
                    return response.json();
                }).catch(err=>console.log(err));

    return from(resp);
}

export function getUser(email:string) : Observable<DBResponse>{
    const user = fetch(usersURL+"?email="+email,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user).pipe(take(1));
}

export function getUserWithEmail(email:string) : Observable<DBResponse>{
    const user = fetch(usersURL+"?email="+email,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user);
}

export function getUserWithEmailAndPassword(email:string,password:string) : Observable<DBResponse>{
    const user = fetch(usersURL+"?email="+email+"&password="+password,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user);
}

export function deleteUser(email:string) : Observable<DBResponse>{
    const user = fetch(usersURL+"?email="+email,{method:"DELETE"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(user);
}

export function postObjava(objava:Objava) : Observable<DBResponse>{
    let formBody = new URLSearchParams();
    formBody.append('name',objava.name);
    formBody.append('text',objava.text);
    formBody.append('picture',objava.picture);
    formBody.append('tags',JSON.stringify(objava.tags));
    formBody.append('likes',JSON.stringify(objava.likes));
    formBody.append('author',JSON.stringify(objava.author));

    const resp=fetch(objavaURL,
                {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body: formBody
                }).then(response=>{
                    return response.json();
                }).catch(err=>console.log(err));

    return from(resp);
}

export function getObjave():Observable<DBResponse>{
    const resp = fetch(objavaURL,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function getObjaveByTags():Observable<DBResponse>{
    const resp = fetch(objavaURL+"?tags=true",{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function getObjaveFromUser(email:string):Observable<DBResponse>{
    const resp = fetch(objavaURL+"?email="+email,{method:"GET"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function changeObajava(objavaID:string,text:string,picture:string):Observable<DBResponse>{
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

export function deleteObjava(objavaID:string):Observable<DBResponse>{
    const resp = fetch(objavaURL+"?id="+objavaID,{method:"DELETE"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function postLikeObjava(email:string,objavaID:string):Observable<DBResponse>{
    const resp = fetch(likeURL+"?email="+email+"&oid="+objavaID,{method:"POST"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
}

export function postDislikeObjava(email:string,objavaID:string):Observable<DBResponse>{
    const resp = fetch(dislikeURL+"?email="+email+"&oid="+objavaID,{method:"POST"})
                    .then(response=>{
                        return response.json();
                    })
                    .catch(err=>console.log(err));
    
    return from(resp);
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