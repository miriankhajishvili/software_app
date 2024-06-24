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
  username: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Data;
  updatedAt: Data;
}
