import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ObjavaSingleComponent } from './components/objava-single/objava-single.component';
import { ObjaveFeedComponent } from './components/objave-feed/objave-feed.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NewObjavaComponent } from './components/new-objava/new-objava.component';

export const routes: Routes = [
    {
        path:'',
        component:ObjaveFeedComponent,
        title:'Home page'
    },
    {
        path:'sign-in',
        component:SignInComponent,
        title:'Sign in'
    },
    {
        path:'log-in',
        component:LogInComponent,
        title:'Log in'
    },
    {
        path:'profile',
        component:ProfilComponent,
        title:'Profile'
    },
    {
        path:'new-post',
        component:NewObjavaComponent,
        title:'New post'
    }
];
