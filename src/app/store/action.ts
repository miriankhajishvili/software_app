import { createActionGroup, props } from '@ngrx/store';
import {
  ICreateProductResponse,
  IProduct,
  IProductResponse,
  pageRequest,
} from '../shared/interfaces/product-list';
import { ILogin, ILoginRespons } from '../shared/interfaces/auth.interface';
import {
  IManagerCreate,
  IManagers,
} from '../shared/interfaces/manager.interface';
import { IGetAllSoldProducts, IProducts } from '../shared/interfaces/sold-product.interface';

export const authAction = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ form: ILogin }>(),
    loginSuccess: props<{ loginSuccess: ILoginRespons }>(),
    loginFailure: props<{ error: string }>(),
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
    deleteProductActionSuccess: props<{ id: number }>(),
  },
});

export const deleteManager = createActionGroup({
  source: 'deleteManager',
  events: {
    deleteManagerAction: props<{ id: number }>(),
    deleteManagerSuccess: props<{ id: number }>(),
  },
});

export const createManager = createActionGroup({
  source: 'createManager',
  events: {
    createManagerAction: props<{ form: IManagerCreate }>(),
    createManagerSuccess: props<{ newManager: IManagers }>(),
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

export const getAllSoldProducts = createActionGroup({
  source: 'getAllSoldProducts',
  events: {
    getAllSoldProductsAction: props<{ pageRequest: pageRequest }>(),
    getAllSoldProductsSuccess: props<{
      soldProducts: IProducts[];
      items: number;
    }>(),
  },
});

export const editProduct = createActionGroup({
  source: 'editProduct',
  events: {
    editProductAction: props<{ form: IProduct; id: number }>(),
    editProductSuccess: props<{
      id: number;
      product: ICreateProductResponse;
    }>(),
  },
});
