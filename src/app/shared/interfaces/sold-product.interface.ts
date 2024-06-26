import { Data } from '@angular/router';

export interface IGetAllSoldProducts {
  sellingProducts: ISoldProducts[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: number;
}

export interface ISoldProducts {
  quantity: number;
  price: number;
  name: string;
  soldAt: Data;
}

export interface ISellProduct {
  quantity: number;
}
