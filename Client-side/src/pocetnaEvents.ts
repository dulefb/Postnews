import { Observable, Subject, debounceTime, filter, fromEvent, map, switchMap } from "rxjs";
import { Objava } from "../classes/Objava";
import { User } from "../classes/User";
import { changeObajava, getObjave, getObjaveByTags, getObjaveFromUser, postObjava } from "./dbServices";
import { drawObjaveFromUser, drawObjavePocetna, drawSearchRecept } from "./drawFunctions";

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
            objava.author=JSON.parse(sessionStorage.getItem("current-user"));
            console.log(objava);
        if(objava.name==="" || objava.text==="" || objava.tags.length===0 || objava.picture===""){
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

export function changeObjavaEvent(objavaID:string){
    let textValue:string;
    let pictureValue:string;
    let control$ = new Subject<string>();
    const img$=addImageObservable(control$)
                .subscribe(next=>{
                    pictureValue=next;
                });
        document.querySelector(".changeObjavaButton").addEventListener("click",()=>{
            textValue=(<HTMLInputElement>document.querySelector("#objavaText")).value;
        if(textValue==="" || pictureValue===""){
                alert("Morate da unesete sva polja...");
            }
            else{
                changeObajava(objavaID,textValue,pictureValue)
                    .subscribe(next=>{
                        if(!next.valid){
                            alert(next.message);
                        }
                        else{
                            alert(next.message);
                            document.location.reload();
                        }
                    })
            }
    });
}

export function getObjaveEvent(){
    getObjave()
        .subscribe(next=>{
            if(next.valid){
                removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
                drawObjavePocetna(document.querySelector(".middle"),next.data);
            }
            else{
                alert(next.message);
            }
        });
}

export function getObjaveByTagsEvent(tags:string[]){
    getObjaveByTags(tags)
        .subscribe(next=>{
            if(next.valid){
                removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
                drawObjavePocetna(document.querySelector(".middle"),next.data);
            }
            else{
                alert(next.message);
            }
        })
}

export function objaveFromUserEvent(){
    let user=<User>JSON.parse(sessionStorage.getItem("current-user"));
    getObjaveFromUser(user.email)
        .subscribe(next=>{
            if(next.valid){
                // removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
                drawObjaveFromUser(document.querySelector(".middle"),next.data);
            }
            else{
                alert(next.message);
            }
        })
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

export function addObservableForSearch() {
    fromEvent(document.querySelector("#header-search-input"),"input")
                .pipe(
                    debounceTime(200),
                    map((event: InputEvent) => (<HTMLInputElement>event.target).value),
                    filter(text=>text.length>=3),
                    switchMap(value=>getObjave()),
                    map(stream=><Objava[]>stream.data)
                )
                .subscribe(next=>{
                    // let parent = document.querySelector("#search-bar-dropdown-show");
                    // removeSearchBarRecepts();
                    // next.forEach(obj=>drawSearchRecept(parent,obj));
                    console.log(next);
                });
}

export function addImageObservable(control$:Subject<string>) : Observable<string>{
    return fromEvent(document.querySelector("#objavaImg"),"input")
        .pipe(
            map((event: InputEvent) => {console.log((<HTMLInputElement>event.target).files[0]);return (<HTMLInputElement>event.target).files[0]}),
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