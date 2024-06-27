import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IPageRequest } from '../interfaces/product-listinterface';
import { Observable } from 'rxjs';
import { IGetAllSoldProducts } from '../interfaces/sold-product.interface';

@Injectable({
  providedIn: 'root',
})
export class SoldProductService extends BaseService {
  getAllSoldProducts(
    IPageRequest: IPageRequest
  ): Observable<IGetAllSoldProducts> {
    const { page } = IPageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllSoldProducts>(`products/sold${pageDetail}`);
  }
}
