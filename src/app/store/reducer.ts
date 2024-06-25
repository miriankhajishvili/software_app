import { createFeature, createReducer, on } from '@ngrx/store';
import { iProductsState } from '../shared/interfaces/product-list';

import { authAction, createManager, createProduct, deleteManager, deleteProduct, editProduct, getAllManagers, getAllProducts } from './action';

const initialState: iProductsState = {
  managers: [],
  products: [],
  items: 0,

};

const products = createFeature({
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

    on(getAllManagers.getAllManagersAction, (state)=> ({...state})),
    on(getAllManagers.getAllManagersSuccess, (state, action)=> ({
      ...state,
      managers: action.managers,
      items: action.items
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
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productReducer,
  selectProducts,
  selectItems,
  selectManagers,

} = products;
