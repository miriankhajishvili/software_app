import { createActionGroup, props } from '@ngrx/store';
import {
  ICreateProductResponse,
  IGetAllProducts,
  IGetAllProductsList,
  IProduct,
  IProductResponse,
  
  pageRequest,
} from '../shared/interfaces/product-list';
import { ILogin, ILoginRespons } from '../shared/interfaces/auth.interface';
import {
  IManagerCreate,
  IManagers,
} from '../shared/interfaces/manager.interface';
import { ISoldProducts } from '../shared/interfaces/sold-product.interface';

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
    getAllProductsAction: props<{ pageRequest: IGetAllProductsList }>(),
    getAllProductsSuccess: props<{
      products: IProductResponse[];
      items: number;
    }>(),
    getAllProductsFailure: props<{ error: string }>(),
  },
});

export const createProduct = createActionGroup({
  source: 'createPRoduct',
  events: {
    createProduct: props<{ form: IProduct }>(),
    createProductSuccess: props<{ newProduct: ICreateProductResponse }>(),
    createProductFailure: props<{ error: string }>(),
  },
});

export const deleteProduct = createActionGroup({
  source: 'deleteProduct',
  events: {
    deleteProductAction: props<{ id: number }>(),
    deleteProductActionSuccess: props<{ id: number }>(),
    deleteProductFailure: props<{ error: string }>(),
  },
});

export const deleteManager = createActionGroup({
  source: 'deleteManager',
  events: {
    deleteManagerAction: props<{ id: number }>(),
    deleteManagerSuccess: props<{ id: number }>(),
    deleteManagerFailure: props<{ error: string }>(),
  },
});

export const createManager = createActionGroup({
  source: 'createManager',
  events: {
    createManagerAction: props<{ form: IManagerCreate }>(),
    createManagerSuccess: props<{ newManager: IManagers }>(),
    createManagerFailure: props<{ error: string }>(),
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
    getAllManagersFailure: props<{ error: string }>(),
  },
});

export const getAllSoldProducts = createActionGroup({
  source: 'getAllSoldProducts',
  events: {
    getAllSoldProductsAction: props<{ pageRequest: pageRequest }>(),
    getAllSoldProductsSuccess: props<{
      soldProducts: ISoldProducts[];
      items: number;
    }>(),
    getAllSoldProductsFailure: props<{ error: string }>(),
  },
});

export const editProduct = createActionGroup({
  source: 'editProduct',
  events: {
    editProductAction: props<{ form: IProduct }>(),
    editProductSuccess: props<{
      id: number;
      product: ICreateProductResponse;
    }>(),
    editProductFailure: props<{ error: string }>(),
  },
});

export const editManager = createActionGroup({
  source: 'editManager',
  events: {
    editManager: props<{ form: IManagerCreate }>(),
    editManagerSuccess: props<{
      id: number;
      manager: ICreateProductResponse;
    }>(),
    editManagerFailure: props<{ error: string }>(),
  },
});

export const sellProduct = createActionGroup({
  source: 'sellProduct',
  events: {
    sellProduct: props<{ quantity: number; id: number }>(),
    sellProductSuccess: props<{ quantity: number }>(),
    sellProductFailure: props<{ error: string }>(),
  },
});
