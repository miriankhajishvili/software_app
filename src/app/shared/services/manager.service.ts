import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { pageRequest } from '../interfaces/product-list';
import { Observable } from 'rxjs';
import { IGetAllManagers, IManagerCreate, IManagers } from '../interfaces/manager.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  
  getAllManagers(pageRequest: pageRequest): Observable<IGetAllManagers> {
    const { page, search, sort } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllManagers>(`users/managers${pageDetail}`);
  }

  createManager(form: IManagerCreate): Observable<IManagers> {
    return this.post<IManagers>(`manager/register`, form);
  }


  deleteManager(id: number): Observable<IManagers> {
    return this.delete<IManagers>(`users/${id}`);
  }

}
