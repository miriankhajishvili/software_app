import { createActionGroup, props } from '@ngrx/store';
import {
  ICreateProductResponse,
  IProduct,
  IProductResponse,
  pageRequest,
} from '../shared/interfaces/product-list';
import { ILogin, ILoginRespons } from '../shared/interfaces/auth.interface';
import { IManagers } from '../shared/interfaces/manager.interface';

export const authAction = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ form: ILogin }>(),
    loginSuccess: props<{ loginSuccess: ILoginRespons }>(),
    loginFailure:  props<{ error: string }>()
    
  },
});

export const getAllProducts = createActionGroup({
  source: 'getAllProducts',
  events: {
    getAllProductsAction: props<{ pageRequest: pageRequest }>(),
    getAllProductsSuccess: props<{
      products: IProductResponse[];
      items: number;
    }>(),
  },
});

export const createProduct = createActionGroup({
  source: 'createPRoduct',
  events: {
    createProduct: props<{ form: IProduct }>(),
    createProductSuccess: props<{ newProduct: ICreateProductResponse }>(),
  },
});

export const deleteProduct = createActionGroup({
  source: 'deleteProduct',
  events: {
    deleteProductAction: props<{ id: number }>(),
    deleteClientActionSuccess: props<{ id: number }>(),
  },
});

export const getAllManagers = createActionGroup({
  source: 'getAllManagers',
  events: {
    getAllManagersAction: props<{ pageRequest: pageRequest }>(),
    getAllManagersSuccess: props<{
      managers: IManagers[];
      items: number;
    }>(),
  },
});
