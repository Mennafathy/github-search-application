import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { repoReducer } from './Core/Store/Reducer/repos.reducer';
import { RepoEffects } from './Core/Store/Effects/repos.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { userReducer } from './Core/Store/Reducer/users.reducer';
import { UserEffects } from './Core/Store/Effects/users.effect';
import { userDetailsReducer } from './Core/Store/Reducer/user-details.reducer';
import { UserDetailsEffects } from './Core/Store/Effects/user-details.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore({
      repos: repoReducer,
      users: userReducer,
      userDetails: userDetailsReducer,
    }),
    provideEffects(RepoEffects, UserEffects, UserDetailsEffects),
  ],
};
