import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { pageRequest } from '../interfaces/product-list';
import { Observable } from 'rxjs';
import { IGetAllSoldProducts } from '../interfaces/sold-product.interface';

@Injectable({
  providedIn: 'root'
})
export class SoldProductService extends BaseService {


  getAllSoldProducts(pageRequest: pageRequest): Observable<IGetAllSoldProducts> {
    const { page, firstname, lastname } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllSoldProducts>(`products/sold${pageDetail}`);
  }

  
}
