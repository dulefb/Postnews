import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './store/user.reducer';
import { AppState } from './app.state';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { objaveReducer } from './store/objave.reducer';
import { ObjaveEffects } from './store/objave.effects';
import { queryReducer } from './store/query.reducer';
import { QueryEffects } from './store/query.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(
      {
        userState:userReducer,
        objaveState:objaveReducer,
        queryState:queryReducer
      }
    ),
    provideEffects([UserEffects,ObjaveEffects,QueryEffects]),
    provideHttpClient(withFetch()),
    provideStoreDevtools({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        connectInZone: true // If set to true, the connection is established within the Angular zone
    }), provideAnimationsAsync(),
]
};
