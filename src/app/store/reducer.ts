import { createFeature, createReducer, on } from '@ngrx/store';
import { IProduct, iProductsState } from '../shared/interfaces/product-list';

import { getAllProducts } from './action';

const initialState: iProductsState = {
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
      items: action.items
    }))
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productReducer,
  selectProducts,
  selectItems,
} = products;
