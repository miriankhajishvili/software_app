import { Data } from '@angular/router';

export interface IGetAllManagers {
  managers: IManagers[];
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: number;
}

export interface IManagers {
  id: number;
  lastName: string;
  totalPriceOfSellingProducts: number;
  firstName: string;
  password: string;
  email: string;
  role: string;
  createdAt: Data;
  updatedAt: Data;
}

export interface IManagerCreate {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string;
}
