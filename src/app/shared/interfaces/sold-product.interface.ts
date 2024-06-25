import { Data } from '@angular/router';
import { IManagers } from './manager.interface';

export interface IGetAllSoldProducts {
  products: IProducts[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: number;
}

export interface IProducts {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: Data;
  updatedAt: Data;
  managers: IManagers[];
}
