import { Data } from '@angular/router';
import { IManagers } from './manager.interface';
import { ILoginUser } from './auth.interface';
import { IGetAllSoldProducts, IProducts } from './sold-product.interface';

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
  managers: number[];
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
  soldProducts: IProducts[]
  managers: IManagers[];
  products: IProductResponse[];
  items: number;
  
}

export interface pageRequest {
  page: number;
  row: number;
  search: string | undefined | null;
  sort: string;
}
