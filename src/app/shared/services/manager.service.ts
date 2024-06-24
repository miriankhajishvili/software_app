import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { pageRequest } from '../interfaces/product-list';
import { Observable } from 'rxjs';
import { IGetAllManagers } from '../interfaces/manager.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagerService extends BaseService {
  
  getAllManagers(pageRequest: pageRequest): Observable<IGetAllManagers> {
    const { page, search, sort } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllManagers>(`users/managers${pageDetail}`);
  }
}
