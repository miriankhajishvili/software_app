import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../shared/services/product.service';
import {
  authAction,
  createProduct,
  deleteProduct,
  getAllProducts,
} from './action';
import { map, switchMap } from 'rxjs';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from '../shared/services/auth.service';
import { ILoginRespons } from '../shared/interfaces/auth.interface';
import { Router } from '@angular/router';

export const getAllProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(getAllProducts.getAllProductsAction),
      switchMap(({ pageRequest }) => {
        return productService.getAllProducts(pageRequest).pipe(
          map((res) => {
            return getAllProducts.getAllProductsSuccess({
              products: res.data,
              items: res.items,
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
            ngToastService.success({
              detail: 'Success Message',
              summary: 'User logged out successfully',
            });
            router.navigate(['/products']);

            return authAction.loginSuccess({ loginSuccess: loginUser });
          })
        );
      })
    );
  },
  { functional: true }
);
