import { createFeature, createReducer } from '@ngrx/store';
import { IProduct, iProductsState } from '../shared/interfaces/product-list';
import { on } from 'events';
import { getAllProducts } from './action';

const initialState: iProductsState = {
  products: [],
};


const products = createFeature({
    name: 'products',
    reducer: createReducer(
        initialState,


    on(getAllProducts.getAllProductsAction, )
    )
})