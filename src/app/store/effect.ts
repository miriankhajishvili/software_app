import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../shared/services/product.service';
import {
  authAction,
  createManager,
  createProduct,
  deleteProduct,
  editProduct,
  getAllManagers,
  getAllProducts,
} from './action';
import { catchError, map, of, switchMap } from 'rxjs';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from '../shared/services/auth.service';
import { ILoginRespons } from '../shared/interfaces/auth.interface';
import { Router } from '@angular/router';
import { ManagerService } from '../shared/services/manager.service';

export const getAllProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(getAllProducts.getAllProductsAction),
      switchMap(({ pageRequest }) => {
        return productService.getAllProducts(pageRequest).pipe(
          map((res) => {
            return getAllProducts.getAllProductsSuccess({
              products: res.products,
              items: res.total,
            });
          })
        );
      })
    );
  },
  { functional: true }
);

export const createProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(createProduct.createProduct),
      switchMap(({ form }) => {
        return productService.createProduct(form).pipe(
          map((res) => {
            return createProduct.createProductSuccess({
              newProduct: res,
            });
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(deleteProduct.deleteProductAction),
      switchMap(({ id }) => {
        return productService.deleteProduct(id).pipe(
          map((res) => {
            return deleteProduct.deleteClientActionSuccess({ id });
          })
        );
      })
    );
  },
  { functional: true }
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(authAction.login),
      switchMap(({ form }) => {
        return authService.login(form).pipe(
          map((loginUser: ILoginRespons) => {
            localStorage.setItem(
              'currentUser',
              loginUser.userData.name + ' ' + loginUser.userData.surname
            );
            localStorage.setItem('Role', loginUser.userData.role);
            ngToastService.success({
              detail: 'Success Message',
              summary: 'User logged out successfully',
            });
            router.navigate(['/products']);

            return authAction.loginSuccess({ loginSuccess: loginUser });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: 'Please check Email or Password',
            });

            return of(
              authAction.loginFailure({
                error: error.message || 'Unknown error',
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const getAllManagersEffect = createEffect(
  (actions$ = inject(Actions), managerService = inject(ManagerService)) => {
    return actions$.pipe(
      ofType(getAllManagers.getAllManagersAction),
      switchMap(({ pageRequest }) => {
        return managerService.getAllManagers(pageRequest).pipe(
          map((res) => {
            return getAllManagers.getAllManagersSuccess({
              managers: res.managers,
              items: res.total,
            });
          })
        );
      })
    );
  },
  { functional: true }
);

export const createManagerEffect = createEffect(
  (actions$ = inject(Actions), managerService = inject(ManagerService)) => {
    return actions$.pipe(
      ofType(createManager.createManagerAction),
      switchMap(({ form }) => {
        return managerService.createManager(form).pipe(
          map((res) => {
            return createManager.createManagerSuccess({
              newManager: res,
            });
          })
        );
      })
    );
  },
  { functional: true }
);

export const editProductEffect = createEffect(
  (action$ = inject(Actions), productService = inject(ProductService)) => {
    return action$.pipe(
      ofType(editProduct.editProductAction),
      switchMap(( {form} , id) => {
        console.log(form)
        return productService.editProduct(id, form).pipe(
          map((data) => {
            return editProduct.editProductSuccess({
              id: data.id,
              product: data,
            });
          })
        );
      })
    );
  },
  { functional: true }
);
