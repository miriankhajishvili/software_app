import { Data } from '@angular/router';
import { IManagers } from './manager.interface';

import { ISoldProducts } from './sold-product.interface';

export interface IGetAllProducts {
  products: IProductResponse[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: any;
}

export interface IProduct {
  id: number;
  name: string;
  price: string;
  quantity: number;
  managers: IManagers[];
}

export interface ICreateProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: Data;
  updatedAt: Data;
  managers: [
    {
      id: number;
      username: string;
      name: string;
      surname: string;
      email: string;
      role: string;
      createdAt: Data;
      updatedAt: Data;
    }
  ];
}

export interface IProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: Data;
  updatedAt: Data;
}

export interface iProductsState {
  allManagers: IManagers[];
  soldProducts: ISoldProducts[];
  managers: IManagers[];
  products: IProductResponse[];
  items: number;
}

export interface IPageRequest {
  page: number;
  limit?: number;
}



export interface IGetAllProductsList {
  page: number;
  search?: string;
}
