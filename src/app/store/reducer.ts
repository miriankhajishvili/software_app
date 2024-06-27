import { createFeature, createReducer, on } from '@ngrx/store';
import { iProductsState } from '../shared/interfaces/product-listinterface';

import {
  createManager,
  createProduct,
  deleteManager,
  deleteProduct,
  editManager,
  editProduct,
  getAllManagers,
  getAllManagersUnlimited,
  getAllProducts,
  getAllSoldProducts,
} from './action';

const initialState: iProductsState = {
  allManagers: [],
  soldProducts: [],
  managers: [],
  products: [],
  items: 0,
};

const main = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,

    on(getAllProducts.getAllProductsAction, (state) => ({ ...state })),
    on(getAllProducts.getAllProductsSuccess, (state, action) => ({
      ...state,
      products: action.products,
      items: action.items,
    })),

    on(createProduct.createProduct, (state) => ({ ...state })),
    on(createProduct.createProductSuccess, (state, action) => ({
      ...state,
      products: [...state.products, action.newProduct],
    })),
    on(deleteProduct.deleteProductAction, (state, action) => {
      const updateProdudct = state.products.filter(
        (products) => products.id !== action.id
      );
      return { ...state, products: updateProdudct };
    }),

    on(deleteManager.deleteManagerAction, (state, action) => {
      const updateManager = state.managers.filter(
        (managers) => managers.id !== action.id
      );
      return { ...state, managers: updateManager };
    }),

    on(getAllManagers.getAllManagersAction, (state) => ({ ...state })),
    on(getAllManagers.getAllManagersSuccess, (state, action) => ({
      ...state,
      managers: action.managers,
      items: action.items,
    })),

    on(getAllManagersUnlimited.getAllManagersUnlimitedAction, (state) => ({ ...state })),
    on(getAllManagersUnlimited.getAllManagersUnlimitedSuccess, (state, action) => ({
      ...state,
      allManagers: action.managers,
      items: action.items,
    })),


    on(getAllSoldProducts.getAllSoldProductsAction, (state) => ({ ...state })),
    on(getAllSoldProducts.getAllSoldProductsSuccess, (state, action) => ({
      ...state,
      soldProducts: action.soldProducts,
      items: action.items,
    })),

    on(createManager.createManagerAction, (state) => ({ ...state })),
    on(createManager.createManagerSuccess, (state, action) => ({
      ...state,
      managers: [...state.managers, action.newManager],
    })),

    on(editProduct.editProductAction, (state) => ({ ...state })),
    on(editProduct.editProductSuccess, (state, action) => {
      const editedProduct = state.products.map((products) => {
        if (action.product.id === products.id) {
          return action.product;
        } else {
          return products;
        }
      });
      return { ...state, products: editedProduct };
    }),
    on(editManager.editManagerAction, (state) => ({ ...state })),
    on(editManager.editManagerSuccess, (state, action) => {
      const editManager = state.managers.map((managers) => {
        if (action.manager.id === managers.id) {
          return action.manager;
        } else {
          return managers;
        }
      });
      return { ...state, managers: editManager };
    })
  ),
  
});

export const {
  name: productsFeatureKey,
  reducer: mainReducer,
  selectProducts,
  selectItems,
  selectManagers,
  selectSoldProducts,
  selectAllManagers
} = main;
