import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../shared/services/product.service';
import { getAllProducts } from './action';
import { map, switchMap } from 'rxjs';

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
