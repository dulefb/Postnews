import { Observable, Subject, fromEvent, map, switchMap } from "rxjs";
import { Objava } from "../classes/Objava";
import { User } from "../classes/User";
import { postObjava } from "./dbServices";

export function postObjavaEvents(){
    const objava = new Objava();
    let control$ = new Subject<string>();
    const img$=addImageObservable(control$)
                .subscribe(next=>{
                    objava.picture=next;
                });
    document.querySelector(".postObjavaButton").addEventListener("click",()=>{
            objava.name=(<HTMLInputElement>document.querySelector("#objavaName")).value;
            objava.text=(<HTMLInputElement>document.querySelector("#objavaText")).value;
            objava.tags=(<HTMLInputElement>document.querySelector("#objavaTags")).value.split(",");
            objava.author=sessionStorage.getItem("current-user");
        if(objava.name==="" || objava.text==="" || objava.tags.length>0 || objava.picture===""){
                alert("Morate da unesete sva polja...");
            }
            else{
                postObjava(objava)
                    .subscribe(postNext=>{
                        console.log(postNext);
                        if(!postNext.valid){
                            alert(postNext.message);
                        }
                        else{
                            alert(postNext.message);
                            document.location.reload();
                        }
                    }); 
            }
    });
}

export function removeChildren(parent:Node,child:NodeListOf<Element>){
    if(child!==null){
        child.forEach(x=>{
            parent.removeChild(x);
        });
    }
}


export function toggleSearchBar(){
    let link = <HTMLLinkElement> document.querySelector("a[href='#search-input']");
    link.onclick=()=>{
        let div = <HTMLDivElement> document.querySelector("#search-bar-dropdown-show");
        div.classList.toggle("hideDisplay");
        removeSearchBarRecepts();
    }
}

export function hideSearchBar(){
    let div = <HTMLDivElement> document.querySelector("#search-bar-dropdown-show");
    div.classList.toggle("hideDisplay",true);
    removeSearchBarRecepts();
}


export function removeSearchBarRecepts(){
    let parent = document.querySelector("#search-bar-dropdown-show");
    let children = document.querySelectorAll(".divSearchSingleRecept");
    if(children.length>0){
        children.forEach(child=>parent.removeChild(child));
    } 
}

export function addImageObservable(control$:Subject<string>) : Observable<string>{
    return fromEvent(document.querySelector("#slikaRecept"),"input")
        .pipe(
            map((event: InputEvent) => (<HTMLInputElement>event.target).files[0]),
            switchMap(file=>imageReader(file,control$))
        );
}

export function imageReader(file:File,control$:Subject<string>) : Observable<string>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return fromEvent(reader,"load")
            .pipe(
                map(event=>{
                    console.log("Image radi");
                    const src = <string>(<FileReader>event.target).result;
                    setImagePreview(src);
                    return src;
                })
            );
}

export function setImagePreview(fileURI:string){
    const preview = document.querySelector("img");
    preview.src=fileURI;
}