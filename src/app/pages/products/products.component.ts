import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IProduct, IProductResponse, pageRequest } from '../../shared/interfaces/product-list';
import { Store } from '@ngrx/store';
import { deleteProduct, getAllProducts } from '../../store/action';
import { Observable } from 'rxjs';
import { selectItems, selectProducts } from '../../store/reducer';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginator,
    MatPaginatorModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductListComponent implements OnInit {
  products$: Observable<IProductResponse[]> = this.store.select(selectProducts);
  item$: Observable<number> = this.store.select(selectItems);
  
  displayedColumns: string[] = [
    'name',
    'price',
    'quantity',
    'delete',
  ];

  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  queryParams = {
    page: 'edit-product',
  };

  constructor(
    private productService: ProductService,
    private store: Store,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.products$.subscribe(res => console.log(res))
  }

  getAllProducts() {
    this.store.dispatch(
      getAllProducts.getAllProductsAction({ pageRequest: this.pagination })
    );
  }

  onPageChange($event: any) {
    this.pagination = {
      ...this.pagination,
      page: $event.pageIndex + 1,
    };
    this.getAllProducts();
  }

  onDelete(product: IProduct) {
    this.dialog.open(DeleteConfirmDialogComponent),
      this.productService.currentProduct$.next(product);
  }

  onEdit(product: IProduct) {
    this.dialog.open(AddEditProductComponent), console.log(product);

    this.productService.currentProduct$.next(product);
  }

  onAddProduct() {
    this.productService.currentProduct$.next(null);
    this.dialog.open(AddEditProductComponent);
  }
}
