import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct, myData, pageRequest } from '../interfaces/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  currentProduct$ = new BehaviorSubject<any>('')

  getAllProducts(pageRequest: pageRequest): Observable<myData> {
    const { page, search, sort } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<myData>(`products${pageDetail}`);
  }

  createProduct(form: IProduct): Observable<IProduct> {
    return this.post<IProduct>(`products`, form);
  }

  editProduct(id: string, form: IProduct): Observable<IProduct> {
    return this.put<IProduct>(`products/${id}`, form);
  }

  deleteProduct(id: string): Observable<IProduct> {
    return this.delete<IProduct>(`products/${id}`);
  }
}
