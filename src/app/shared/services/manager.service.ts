import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { pageRequest } from '../interfaces/product-list';
import { Observable } from 'rxjs';
import {
  IGetAllManagers,
  IManagerCreate,
  IManagers,
} from '../interfaces/manager.interface';
import { createRequestUrl } from '../helpers/url';


@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {


  getAllManagers(pageRequest: pageRequest): Observable<IGetAllManagers> {
    
    const url = createRequestUrl('users/managers', pageRequest);
    return this.get<IGetAllManagers>(url);
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
