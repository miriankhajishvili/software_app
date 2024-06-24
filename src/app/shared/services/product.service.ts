import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ICreateProductResponse,
  IGetAllProducts,
  IProduct,
  pageRequest,
} from '../interfaces/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  currentProduct$ = new BehaviorSubject<any>('');

  getAllProducts(pageRequest: pageRequest): Observable<IGetAllProducts> {
    const { page, search, sort } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllProducts>(`products${pageDetail}`);
  }

  createProduct(form: IProduct): Observable<ICreateProductResponse> {
    return this.post<ICreateProductResponse>(`products`, form);
  }

  editProduct(id: string, form: IProduct): Observable<IProduct> {
    return this.put<IProduct>(`products/${id}`, form);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.delete<IProduct>(`products/${id}`);
  }
}
