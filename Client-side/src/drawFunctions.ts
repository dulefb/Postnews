import { getUserWithEmail, getUserWithEmailAndPassword, postUser } from "./dbServices";
import { User } from "../classes/User";
import { filter,Subject } from "rxjs";
import { setUpLogin } from "./loginEvents";
import { setUpSignin } from "./signupEvents";
import {  removeChildren } from "./pocetnaEvents";

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
    let currentUserLabel = sessionStorage.getItem("current-user-label");

    if(currentUser!==null){
        addLinkToClassElement(".header","#profil","header-item","PROFIL");
        addLinkToClassElement(".header","#odjavi-se","header-item","ODJAVI SE");
        removeLinkFromClassElement(".header","#prijavi-se");
        removeLinkFromClassElement(".header","#kreiraj-nalog");
    }
    else{
        addLinkToClassElement(".header","#prijavi-se","header-item","PRIJAVI SE");
        addLinkToClassElement(".header","#kreiraj-nalog","header-item","KREIRAJ NALOG");
        removeLinkFromClassElement(".header","#profil");
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
        }
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