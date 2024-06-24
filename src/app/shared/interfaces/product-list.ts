import { Data } from '@angular/router';

export interface IGetAllProducts {
  products: IProductResponse[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: any;
}

export interface IProduct {
  id?: string;
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
  createdAt: any;
  updatedAt: any;
  managers: [
    {
      id: number;
      username: string;
      name: string;
      surname: string;
      email: string;
      role: string;
      createdAt: any;
      updatedAt: any;
    }
  ];
}

export interface IProductResponse {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: any;
  updatedAt: any;
}

export interface iProductsState {
  products: IProductResponse[];
  items: number;
}

export interface pageRequest {
  page: number;
  row: number;
  search: string | undefined | null;
  sort: string;
}
