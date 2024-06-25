import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  ICreateProductResponse,
  IGetAllProducts,
  IProduct,
  IProductResponse,
  pageRequest,
} from '../interfaces/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  currentProduct$ = new BehaviorSubject<any>('');
  onEditClick$ = new BehaviorSubject<boolean>(false)

  getAllProducts(pageRequest: pageRequest): Observable<IGetAllProducts> {
    const { page, search, sort } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllProducts>(`products${pageDetail}`);
  }

  createProduct(form: IProduct): Observable<ICreateProductResponse> {
    return this.post<ICreateProductResponse>(`products`, form);
  }

  editProduct(id: number, form: IProduct): Observable<ICreateProductResponse> {
    return this.patch<ICreateProductResponse>(`products/${id}`, form);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.delete<IProduct>(`products/${id}`);
  }
}
