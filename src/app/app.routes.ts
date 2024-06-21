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
      {
        path: 'add-product',
        loadComponent: () =>
          import('./pages/add-edit-product/add-edit-product.component').then(
            (m) => m.AddEditProductComponent
          ),
      },
    ],
  },
];
