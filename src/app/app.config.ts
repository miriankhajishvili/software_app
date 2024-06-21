import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as getAllProductsEffect from './store/effect';
import { provideState, provideStore } from '@ngrx/store';
import { productReducer } from './store/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(),
    provideEffects(getAllProductsEffect),
    provideState({name: 'products', reducer: productReducer})
  ],
};
