import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import path from 'path';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
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
          canActivate: [authGuard]
      },
      {
        path: 'managers',
        loadComponent: () =>
          import('./pages/managers/managers.component').then(
            (m) => m.ManagersComponent
          ),
          canActivate: [authGuard]
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./pages/add-edit-product/add-edit-product.component').then(
            (m) => m.AddEditProductComponent
          ),
      },
      {
        path: 'edit-product/:id',
        loadComponent: () =>
          import('./pages/add-edit-product/add-edit-product.component').then(
            (m) => m.AddEditProductComponent
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import(
        './shared/components/pagenotfound/pagenotfound.component'
      ).then((m) => m.PagenotfoundComponent),
  },
];
