import { createActionGroup, props } from '@ngrx/store';
import { IProduct } from '../shared/interfaces/product-list';

export const getAllProducts = createActionGroup({
  source: 'getAllProducts',
  events: {
    getAllProductsAction: props<{
      products: IProduct[];
    }>(),
  },
});
