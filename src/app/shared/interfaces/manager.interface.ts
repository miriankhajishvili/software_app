import { Data } from '@angular/router';

export interface IGetAllManagers {
  managers: IManagers[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: any;
}

export interface IManagers {
  id: number;
  username: string;
  name: string;
  totalPriceOfSellingProducts: number;
  surname: string;
  password: string;
  email: string;
  role: string;
  createdAt: Data;
  updatedAt: Data;
}

export interface IManagerCreate {
  username: string
  name: string
  surname: string
  email: string
  password: number;
}
