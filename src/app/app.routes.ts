import { Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';

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
      },
    ],
  },
];
