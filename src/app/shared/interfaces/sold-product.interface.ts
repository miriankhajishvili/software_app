import { Data } from '@angular/router';

export interface IGetAllSoldProducts {
  sellingProducts: ISoldProducts[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: number;
}

export interface ISoldProducts {
  name: string;
  price: number;
  soldAt: Data;
  totalPrice: number
  totalQuantity: number;
}

export interface ISellProduct {
  quantity: number;
}
