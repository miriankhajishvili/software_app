import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable} from 'rxjs';
import {
  ICreateProductResponse,
  IGetAllProducts,
  IGetAllProductsList,
  IProduct,


 
} from '../interfaces/product-listinterface';
import { ISellProduct } from '../interfaces/sold-product.interface';
import { createRequestUrl } from '../helpers/url';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  getAllProducts(productRequest: IGetAllProductsList): Observable<IGetAllProducts> {
    const url = createRequestUrl('products', productRequest);
    return this.get<IGetAllProducts>(url);
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
