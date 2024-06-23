import { createFeature, createReducer, on } from '@ngrx/store';
import { IProduct, iProductsState } from '../shared/interfaces/product-list';

import { createProduct, deleteProduct, getAllProducts } from './action';

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
    })
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productReducer,
  selectProducts,
  selectItems,
} = products;
