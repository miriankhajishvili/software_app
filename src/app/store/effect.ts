import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../shared/services/product.service';
import { createProduct, deleteProduct, getAllProducts } from './action';
import { map, switchMap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

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
      switchMap(({form})=> {
        return  productService.createProduct(form).pipe(
          map((res)=> {
            return createProduct.createProductSuccess({
              newProduct: res
            })
          })
        )
      })
    )
  },
  {functional:true}
)



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
