import { Data } from '@angular/router';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginRespons {
  accessToken: string;
  userData: ILoginUser;
}

export interface ILoginUser {
  id: number;
  firstName: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Data;
  updatedAt: Data;
}
