import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IPageRequest } from '../interfaces/product-listinterface';
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


  getAllManagers(IPageRequest: IPageRequest): Observable<IGetAllManagers> {
    
    const url = createRequestUrl('users/managers', IPageRequest);
    return this.get<IGetAllManagers>(url);
  }

  createManager(form: IManagerCreate): Observable<IManagers> {
    return this.post<IManagers>(`manager/register`, form);
  }

  editManager(id: number, form: IManagerCreate): Observable<IManagers> {
    return this.patch<IManagers>(`manager/${id}`, form);
  }

  deleteManager(id: number): Observable<IManagers> {
    return this.delete<IManagers>(`users/${id}`);
  }
}
