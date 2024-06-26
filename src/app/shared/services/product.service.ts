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
import { ISellProduct } from '../interfaces/sold-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {

  getAllProducts(pageRequest: pageRequest): Observable<IGetAllProducts> {
    const { page, firstname, lastname } = pageRequest;
    let pageDetail = `?page=${page}`;
    return this.get<IGetAllProducts>(`products${pageDetail}`);
  }

  createProduct(form: IProduct): Observable<ICreateProductResponse> {
    return this.post<ICreateProductResponse>(`products`, form);
  }
  sellProduct(quantity: ISellProduct, id: number): Observable<ISellProduct> {
    return this.post<ISellProduct>(`products/sell/${id}`, quantity);
  }

  editProduct(id: number, form: IProduct): Observable<ICreateProductResponse> {
    return this.patch<ICreateProductResponse>(`products/${id}`, form);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.delete<IProduct>(`products/${id}`);
  }
}
