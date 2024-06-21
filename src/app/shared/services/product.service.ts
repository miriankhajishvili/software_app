import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IProduct, pageRequest } from '../interfaces/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  getAllProducts(pageRequest: pageRequest): Observable<IProduct[]> {
    const { page, search, sort } = pageRequest;

    let pageDetail = `?_page=${page}`;

    return this.get<IProduct[]>(`products${pageDetail}`);
  }
}
