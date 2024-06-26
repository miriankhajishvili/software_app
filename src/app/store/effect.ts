import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../shared/services/product.service';
import {
  authAction,
  createManager,
  createProduct,
  deleteManager,
  deleteProduct,
  editManager,
  editProduct,
  getAllManagers,
  getAllProducts,
  getAllSoldProducts,
  sellProduct,
} from './action';
import { catchError, map, of, switchMap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../shared/services/auth.service';
import { ILoginRespons } from '../shared/interfaces/auth.interface';
import { Router } from '@angular/router';
import { ManagerService } from '../shared/services/manager.service';
import { SoldProductService } from '../shared/services/sold-product.service';

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
            console.log(loginUser);
            localStorage.setItem(
              'currentUser',
              loginUser.userData.firstName + ' ' + loginUser.userData.lastName
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
            console.log(error);
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              authAction.loginFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const getAllProductsEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(getAllProducts.getAllProductsAction),
      switchMap(({ pageRequest }) => {
        return productService.getAllProducts(pageRequest).pipe(
          map((res) => {
            return getAllProducts.getAllProductsSuccess({
              products: res.products,
              items: res.total,
            });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              getAllProducts.getAllProductsFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const createProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(createProduct.createProduct),
      switchMap(({ form }) => {
        return productService.createProduct(form).pipe(
          map((res) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Product added successfully',
            });
            return createProduct.createProductSuccess({
              newProduct: res,
            });
          }),
          catchError((error) => {
            console.log(error);
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              createProduct.createProductFailure({
                error: error.message,
              })
            );
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
          map((_) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Product deleted successfully',
            });
            return deleteProduct.deleteProductActionSuccess({ id });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });
            return of(
              deleteProduct.deleteProductFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteManagerEffect = createEffect(
  (
    actions$ = inject(Actions),
    managerService = inject(ManagerService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(deleteManager.deleteManagerAction),
      switchMap(({ id }) => {
        return managerService.deleteManager(id).pipe(
          map((_) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Manager deleted successfully',
            });
            return deleteManager.deleteManagerSuccess({ id });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              deleteManager.deleteManagerFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const sellProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(sellProduct.sellProduct),
      switchMap((data) => {
        return productService
          .sellProduct({ quantity: data.quantity }, data.id)
          .pipe(
            map((res) => {
              ngToastService.success({
                detail: 'Success Message',
                summary: 'Product Sold successfully',
              });
              return sellProduct.sellProductSuccess({
                quantity: res.quantity,
              });
            }),
            catchError((error) => {
              ngToastService.error({
                detail: 'Error Message',
                summary: error.error.message,
              });

              return of(
                sellProduct.sellProductFailure({
                  error: error.message,
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
  (
    actions$ = inject(Actions),
    managerService = inject(ManagerService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(getAllManagers.getAllManagersAction),
      switchMap(({ pageRequest }) => {
        return managerService.getAllManagers(pageRequest).pipe(
          map((res) => {
            return getAllManagers.getAllManagersSuccess({
              managers: res.managers,
              items: res.total,
            });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              getAllManagers.getAllManagersFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const getAllSoldProductsEffect = createEffect(
  (
    actions$ = inject(Actions),
    soldProductService = inject(SoldProductService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(getAllSoldProducts.getAllSoldProductsAction),
      switchMap(({ pageRequest }) => {
        return soldProductService.getAllSoldProducts(pageRequest).pipe(
          map((res) => {
            return getAllSoldProducts.getAllSoldProductsSuccess({
              soldProducts: res.sellingProducts,
              items: res.total,
            });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              getAllSoldProducts.getAllSoldProductsFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const createManagerEffect = createEffect(
  (
    actions$ = inject(Actions),
    managerService = inject(ManagerService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(createManager.createManagerAction),
      switchMap(({ form }) => {
        return managerService.createManager(form).pipe(
          map((res) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'The manager was created successfully',
            });
            return createManager.createManagerSuccess({
              newManager: res,
            });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              createManager.createManagerFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const editProductEffect = createEffect(
  (
    action$ = inject(Actions),
    productService = inject(ProductService),
    ngToastService = inject(NgToastService)
  ) => {
    return action$.pipe(
      ofType(editProduct.editProductAction),
      switchMap(({ form }) => {
        return productService.editProduct(form.id, form).pipe(
          map((data) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Product edited successfully',
            });
            return editProduct.editProductSuccess({
              id: data.id,
              product: data,
            });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              editProduct.editProductFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);


export const editManagerEffect = createEffect(
  (
    action$ = inject(Actions),
    managerService = inject(ManagerService),
    ngToastService = inject(NgToastService)
  ) => {
    return action$.pipe(
      ofType(editManager.editManager),
      switchMap(({ form }) => {
        return managerService.editManager(form.id, form).pipe(
          map((data) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Manager edited successfully',
            });
            return editManager.editManagerSuccess({
              id: data.id,
              manager: data,
            });
          }),
          catchError((error) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: error.error.message,
            });

            return of(
              editManager.editManagerFailure({
                error: error.message,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

