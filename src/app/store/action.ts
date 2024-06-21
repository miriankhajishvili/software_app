import { createActionGroup, props } from '@ngrx/store';
import { IProduct, pageRequest } from '../shared/interfaces/product-list';

export const getAllProducts = createActionGroup({
  source: 'getAllProducts',
  events: {
    getAllProductsAction: props<{ pageRequest: pageRequest }>(),
    getAllProductsSuccess: props<{
      products: IProduct[];
      items: number
    }>(),
  },
});
