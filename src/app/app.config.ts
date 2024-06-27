import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { mainReducer } from './store/reducer';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import * as getAllProductsEffect from './store/effect';
import * as createProductEffect from './store/effect';
import * as deleteProductEffect from './store/effect';
import * as loginEffect from './store/effect';
import * as getAllManagersEffect from './store/effect';
import * as createManagerEffect from './store/effect';
import * as editProductEffect from './store/effect';
import * as deleteManagerEffect from './store/effect';
import * as getAllSoldProductsEffect from './store/effect';
import * as sellProductEffect from './store/effect';
import * as getAllManagersUnlimitedEffect from './store/effect';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideEffects(
      getAllProductsEffect,
      createProductEffect,
      deleteProductEffect,
      loginEffect,
      getAllManagersEffect,
      createManagerEffect,
      editProductEffect,
      deleteManagerEffect,
      getAllSoldProductsEffect,
      sellProductEffect,
      getAllManagersUnlimitedEffect
    ),
    provideState({ name: 'products', reducer: mainReducer }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
