import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [loginGuard],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.routes),
  },

  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        redirectTo: '/prodcuts',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'managers',
        loadComponent: () =>
          import('./pages/managers/managers.component').then(
            (m) => m.ManagersComponent
          ),
        canActivate: [authGuard],
      },

      {
        path: 'sold-products',
        loadComponent: () =>
          import('./pages/sold-products/sold-product.component').then(
            (m) => m.SoldProductComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./shared/components/pagenotfound/pagenotfound.component').then(
        (m) => m.PagenotfoundComponent
      ),
  },
];
