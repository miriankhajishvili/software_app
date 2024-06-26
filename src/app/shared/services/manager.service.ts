import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { pageRequest } from '../interfaces/product-list';
import { Observable } from 'rxjs';
import {
  IGetAllManagers,
  IManagerCreate,
  IManagers,
} from '../interfaces/manager.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  getAllManagers(pageRequest: pageRequest): Observable<IGetAllManagers> {
    const { page, firstname, lastname, from, to } = pageRequest;
    let pageDetail = `&page=${page}`;
    let name = `?firstNameSearch=${firstname}`;
    let surname = `&lastNameSearch=${lastname}`;
    let priceFrom = `&totalPriceMin=${from}`;
    let priceTo = `&totalPriceMax${to}`;
    return this.get<IGetAllManagers>(
      `users/managers${name}${surname}${pageDetail}${priceFrom}${priceTo}`
    );
  }

  createManager(form: IManagerCreate): Observable<IManagers> {
    return this.post<IManagers>(`manager/register`, form);
  }

  editManager(id: number, form: IManagerCreate): Observable<any> {
    return this.patch<any>(`managers/${id}`, form);
  }

  deleteManager(id: number): Observable<IManagers> {
    return this.delete<IManagers>(`users/${id}`);
  }
}
