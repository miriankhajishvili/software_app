import { createFeature, createReducer, on } from '@ngrx/store';
import { iProductsState } from '../shared/interfaces/product-list';

import { authAction, createProduct, deleteProduct, getAllManagers, getAllProducts } from './action';

const initialState: iProductsState = {
  managers: [],
  products: [],
  items: 0,
  currentUser: ''
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

    on(getAllManagers.getAllManagersAction, (state)=> ({...state})),
    on(getAllManagers.getAllManagersSuccess, (state, action)=> ({
      ...state,
      managers: action.managers,
      items: action.items
    })),

    on(authAction.loginSuccess, (state, action)=>({
      ...state,
      currentUser: action.loginSuccess.userData.name + ' '+ action.loginSuccess.userData.surname
    }))
  
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productReducer,
  selectProducts,
  selectItems,
  selectManagers,
  selectCurrentUser
} = products;
