import { createActionGroup, props } from '@ngrx/store';
import { IProduct, pageRequest } from '../shared/interfaces/product-list';
import { ILogin, ILoginRespons } from '../shared/interfaces/auth.interface';

export const authAction = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ form: ILogin }>(),
    loginSuccess: props<{ loginSuccess: ILoginRespons }>(),
  },
});

export const getAllProducts = createActionGroup({
  source: 'getAllProducts',
  events: {
    getAllProductsAction: props<{ pageRequest: pageRequest }>(),
    getAllProductsSuccess: props<{
      products: IProduct[];
      items: number;
    }>(),
  },
});

export const createProduct = createActionGroup({
  source: 'createPRoduct',
  events: {
    createProduct: props<{ form: IProduct }>(),
    createProductSuccess: props<{ newProduct: IProduct }>(),
  },
});

export const deleteProduct = createActionGroup({
  source: 'deleteProduct',
  events: {
    deleteProductAction: props<{ id: string }>(),
    deleteClientActionSuccess: props<{ id: string }>(),
  },
});
