import { deleteObjava, getUserWithEmail, getUserWithEmailAndPassword, postDislikeObjava, postLikeObjava, postUser } from "./dbServices";
import { User } from "../classes/User";
import { filter,Subject } from "rxjs";
import { setUpLogin } from "./loginEvents";
import { setUpSignin } from "./signupEvents";
import {  objaveFromUserEvent, postObjavaEvents, removeChildren } from "./pocetnaEvents";
import { Objava } from "../classes/Objava";

function addLinkToClassElement(class_element:string,href:string,class_name:string,text:string,id_value:string=null) : void{
    const link=document.createElement("a");
    link.href=href;
    link.classList.add(class_name);
    link.innerHTML=text;

    const element = document.querySelector(class_element);
    if(link!==null && element!==null){
        element.appendChild(link);
    }
}

function removeLinkFromClassElement(class_element:string,link_href:string) : void{
    const link = document.querySelector("a[href='"+link_href+"']");
    const element = document.querySelector(class_element);
    if(link!==null && element!==null){
        element.removeChild(link);
    }
}



export function userFilter(){
    let currentUser = JSON.parse(sessionStorage.getItem("current-user"));
    // let currentUserLabel = sessionStorage.getItem("current-user-label");

    if(currentUser!==null){
        addLinkToClassElement(".header","#profil","header-item","PROFIL");
        addLinkToClassElement(".header","#odjavi-se","header-item","ODJAVI SE");
        addLinkToClassElement(".header","#post-objava","header-item","NOVA OBJAVA");
        removeLinkFromClassElement(".header","#prijavi-se");
        removeLinkFromClassElement(".header","#kreiraj-nalog");
    }
    else{
        addLinkToClassElement(".header","#prijavi-se","header-item","PRIJAVI SE");
        addLinkToClassElement(".header","#kreiraj-nalog","header-item","KREIRAJ NALOG");
        removeLinkFromClassElement(".header","#profil");
        removeLinkFromClassElement(".header","#post-objava");
        removeLinkFromClassElement(".header","#odjavi-se");
    }

    const kreiraj_nalog = document.querySelector("a[href='#kreiraj-nalog']");
    const control$ = new Subject<string>();
    if(kreiraj_nalog!==null){
        kreiraj_nalog.addEventListener("click",()=>{
            removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
            drawSignup(document.querySelector(".middle"));
            setUpSignin();
        });
    }

    const prijavi_se = document.querySelector("a[href='#prijavi-se']");
    const login$ = new Subject<string>();
    if(prijavi_se!==null){

        prijavi_se.addEventListener("click",()=>{
            removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
            drawLogin(document.querySelector(".middle"));
            setUpLogin();
        });
    }

    const odjavi_se = document.querySelector("a[href='#odjavi-se']");
    if(odjavi_se!==null){

        odjavi_se.addEventListener("click",()=>{
            removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
            sessionStorage.removeItem("current-user");
            document.location.reload();
        });
    }

    const profil = <HTMLElement>document.querySelector("a[href='#profil']");
    if(profil!==null){
        profil.onclick=()=>{
            removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
            drawKorisnikProfile(document.querySelector(".middle"),currentUser);
            objaveFromUserEvent();
        }
    }

    const postObjava = document.querySelector("a[href='#post-objava']");
    if(postObjava!==null){
        postObjava.addEventListener("click",()=>{
            removeChildren(document.querySelector(".middle"),document.querySelectorAll(".middle > div"));
            drawPostObjava(document.querySelector(".middle"));
            postObjavaEvents();
        });
    }
}

export function drawSignup(parent_node:HTMLElement){

    //rest of signup
    const divSignup = document.createElement("div");
    divSignup.classList.add("divSignup");

    //divSignup za korisnika ili kompaniju
    drawSignupKorisnik(divSignup);
    parent_node.appendChild(divSignup);

    let divSignupButton = document.createElement("div");
    divSignupButton.classList.add("divSignupButton");

    //odvojiti u loginEvents.ts i dodati event na button
    let button = document.createElement("button");
    button.classList.add("signupButton");
    button.innerHTML="Kreiraj";
    divSignupButton.appendChild(button);
    parent_node.appendChild(divSignupButton);
}

export function drawSignupKorisnik(parent_node:HTMLElement){
    const divSignupLabels = document.createElement("div");
    divSignupLabels.classList.add("divSignupLabels");

    let nameLabel = document.createElement("label");
    nameLabel.innerHTML="Ime:";
    divSignupLabels.appendChild(nameLabel);

    let lnameLabel = document.createElement("label");
    lnameLabel.innerHTML="Prezime:";
    divSignupLabels.appendChild(lnameLabel);

    let emailLabel = document.createElement("label");
    emailLabel.innerHTML="E-mail:";
    divSignupLabels.appendChild(emailLabel);

    let passwordLabel = document.createElement("label");
    passwordLabel.innerHTML="Lozinka:";
    divSignupLabels.appendChild(passwordLabel);

    parent_node.appendChild(divSignupLabels);

    //divSignup inputs

    let divSignupInput = document.createElement("div");
    divSignupInput.classList.add("divSignupInput");

    let nameInput = document.createElement("input");
    nameInput.id="signup-name";
    nameInput.type = "name";
    divSignupInput.appendChild(nameInput);

    let lnameInput = document.createElement("input");
    lnameInput.id="signup-lastname";
    lnameInput.type = "name";
    divSignupInput.appendChild(lnameInput);

    let emailInput = document.createElement("input");
    emailInput.id="signup-email";
    emailInput.type = "email";
    divSignupInput.appendChild(emailInput);

    let passwordInput = document.createElement("input");
    passwordInput.id="signup-password";
    passwordInput.type = "password";
    divSignupInput.appendChild(passwordInput);

    parent_node.appendChild(divSignupInput);
}

export function drawLogin(parent_node:HTMLElement){

    let divLogin = document.createElement("div");
    divLogin.classList.add("divLogin");
    
    //login labels
    let divLoginLabels = document.createElement("div");
    divLoginLabels.classList.add("divLoginLabels");

    let emailLabel = document.createElement("label");
    emailLabel.innerHTML="E-mail:";
    divLoginLabels.appendChild(emailLabel);

    let passwordLabel = document.createElement("label");
    passwordLabel.innerHTML="Password:";
    divLoginLabels.appendChild(passwordLabel);

    divLogin.appendChild(divLoginLabels);

    //login inputs

    let divLoginInput = document.createElement("div");
    divLoginInput.classList.add("divLoginInput");

    let emailInput = document.createElement("input");
    emailInput.id="userEmail";
    emailInput.type = "email";
    divLoginInput.appendChild(emailInput);

    let passwordInput = document.createElement("input");
    passwordInput.id="userPass";
    passwordInput.type = "password";
    divLoginInput.appendChild(passwordInput);

    divLogin.appendChild(divLoginInput);

    parent_node.appendChild(divLogin);

    let divLoginButton = document.createElement("div");
    divLoginButton.classList.add("divLoginButton");

    let button = document.createElement("button");
    button.id="btnLogin";
    button.innerHTML="Uloguj se";
    divLoginButton.appendChild(button);

    parent_node.appendChild(divLoginButton);
}

function drawKorisnikProfile(parent:HTMLElement,user:User){

    let divUserProfileInfoData = document.createElement("div");
    divUserProfileInfoData.classList.add("divUserProfileInfoData");
    //podaci
    let divUserName = document.createElement("div");
    let labelName = document.createElement("label");
    labelName.classList.add("main-label");
    labelName.innerHTML="Ime: ";
    divUserName.appendChild(labelName);
    let labelNameValue = document.createElement("div");
    labelNameValue.innerHTML=user.name + " "+user.lastname;
    divUserName.appendChild(labelNameValue); 
    divUserProfileInfoData.appendChild(divUserName);

    let divUserEmail = document.createElement("div");
    let labelEmail = document.createElement("label");
    labelEmail.classList.add("main-label");
    labelEmail.innerHTML="Email: ";
    divUserEmail.appendChild(labelEmail);
    let labelEmailValue = document.createElement("div");
    labelEmailValue.innerHTML=user.email;
    divUserEmail.appendChild(labelEmailValue); 
    divUserProfileInfoData.appendChild(divUserEmail);

    

    parent.appendChild(divUserProfileInfoData);
}

export function drawPostObjava(parent:HTMLElement){
    let divPostObjava = document.createElement("div");
    divPostObjava.classList.add("divPostObjava");

    let divPostObjavaInput = document.createElement("div");
    divPostObjavaInput.classList.add("divPostObjavaInput");

    let divName = document.createElement("div");
    divName.classList.add("divName");
    let labelName = document.createElement("label");
    labelName.innerHTML = "Name: ";
    divName.appendChild(labelName);
    let inputName = document.createElement("input");
    inputName.type = "name";
    inputName.id="objavaName"
    divName.appendChild(inputName);
    divPostObjavaInput.appendChild(divName);

    let divText = document.createElement("div");
    divText.classList.add("divText");
    let labelText = document.createElement("label");
    labelText.innerHTML = "Text: ";
    divText.appendChild(labelText);
    let inputText = document.createElement("textarea");
    inputText.id="objavaText";
    inputText.cols=30;
    inputText.rows=15;
    divText.appendChild(inputText);
    divPostObjavaInput.appendChild(divText);

    let divPicture = document.createElement("div");
    divPicture.classList.add("divPicture");
    let labelPicture = document.createElement("label");
    labelPicture.innerHTML = "Picture: ";
    divPicture.appendChild(labelPicture);
    let inputPicture = document.createElement("input");
    inputPicture.id="objavaImg";
    inputPicture.type="file";
    divPicture.appendChild(inputPicture);
    divPostObjavaInput.appendChild(divPicture);

    let divTags = document.createElement("div");
    divTags.classList.add("divTags");
    let labelTags = document.createElement("label");
    labelTags.innerHTML = "Tagovi(uneti odvojene iskljucivo zapetom): ";
    divTags.appendChild(labelTags);
    let inputTags = document.createElement("input");
    inputTags.id="objavaTags";
    inputTags.type="name";
    divTags.appendChild(inputTags);
    divPostObjavaInput.appendChild(divTags);
    divPostObjava.appendChild(divPostObjavaInput);

    let divPostObjavaImg = document.createElement("div");
    divPostObjavaImg.classList.add("divPostObjavaImg");

    let img = document.createElement("img");
    img.width=100;
    img.height=100;
    divPostObjavaImg.appendChild(img);
    divPostObjava.appendChild(divPostObjavaImg);

    let divPostObjavaButton = document.createElement("div");
    divPostObjavaButton.classList.add("divPostObjavaButton");

    let button = document.createElement("button");
    button.classList.add("postObjavaButton");
    button.innerHTML="Dodaj";
    divPostObjavaButton.appendChild(button);
    divPostObjava.appendChild(divPostObjavaButton);

    parent.appendChild(divPostObjava);
}

export function drawObjavePocetna(parent:HTMLElement,objave:Objava[]){
    //crtaju se sve objave
    let divObjavaPocetna = document.createElement("div");
    divObjavaPocetna.classList.add("divObjavaPocetna");

    objave.forEach(x=>{
        drawObjava(divObjavaPocetna,x);
    });

    parent.appendChild(divObjavaPocetna);
}

export function drawObjava(parent:HTMLElement,objava:any){
    //ovde se crta objava kao post
    let user = <User>JSON.parse(sessionStorage.getItem("current-user"));
    let divObjava = document.createElement("div");
    divObjava.classList.add("divObjava");

    let labelName = document.createElement("label");
    labelName.innerHTML = objava.name;
    divObjava.appendChild(labelName);

    let img = document.createElement("img");
    img.src = objava.picture;
    img.width=250;
    img.height=200;
    divObjava.appendChild(img);

    let labelText = document.createElement("label");
    labelText.innerHTML = objava.text;
    divObjava.appendChild(labelText);

    let labelTags = document.createElement("label");
    labelTags.innerHTML = "<b>Tags:</b>" + objava.tags.join(",");
    divObjava.appendChild(labelTags);

    let labelAutor = document.createElement("label");
    labelAutor.innerHTML="<b>Autor:</b>: " + objava.author.email;
    divObjava.appendChild(labelAutor);

    let labelNumOfLikes = document.createElement("label");
    labelNumOfLikes.innerHTML = "<b>Likes:</b>" + objava.likes.length.toString();
    divObjava.appendChild(labelNumOfLikes);

    if(sessionStorage.getItem("current-user"))
    {
        if(objava.author.email!==user.email){
            let likeButton = document.createElement("button");
            likeButton.innerHTML="Like";
            likeButton.onclick=()=>{
                postLikeObjava(user.email,objava._id)
                    .subscribe(next=>{
                        if(!next.valid){
                            alert(next.message);
                        }
                        else{
                            alert(next.message);
                            document.location.reload();
                        }
                    });
            }
            divObjava.appendChild(likeButton);

            let dislikeButton = document.createElement("button");
            dislikeButton.innerHTML="Dislike";
            dislikeButton.onclick=()=>{
                postDislikeObjava(user.email,objava._id)
                    .subscribe(next=>{
                        if(!next.valid){
                            alert(next.message);
                        }
                        else{
                            alert(next.message);
                            document.location.reload();
                        }
                    });
            }
            divObjava.appendChild(dislikeButton);
        }
    }

    if(sessionStorage.getItem("current-user"))
    {
        if(objava.author.email===user.email){
            let changeButton = document.createElement("button");
            changeButton.innerHTML="Change";
            changeButton.onclick=()=>{

            }
            divObjava.appendChild(changeButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML="Delete";
            deleteButton.onclick=()=>{
                deleteObjava(objava._id)
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
            divObjava.appendChild(deleteButton);
        }
    }

    parent.appendChild(divObjava);
}

export function drawObjaveFromUser(parent:HTMLElement,data:Objava[]){
    let divObjavaPocetna = document.createElement("div");
    divObjavaPocetna.classList.add("divObjavaPocetna");

    let naslov = document.createElement("h2");
    naslov.innerHTML="Vase objave.";
    naslov.classList.add("userObjaveNaslov");
    divObjavaPocetna.appendChild(naslov);

    data.forEach(x=>{
        drawObjava(divObjavaPocetna,x);
    });

    parent.appendChild(divObjavaPocetna);
}