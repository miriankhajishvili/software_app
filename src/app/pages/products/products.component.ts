import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IProduct, pageRequest } from '../../shared/interfaces/product-list';
import { Store } from '@ngrx/store';
import { getAllProducts } from '../../store/action';
import { Observable } from 'rxjs';
import { selectItems, selectProducts } from '../../store/reducer';

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
  products$: Observable<IProduct[]> = this.store.select(selectProducts);
  item$: Observable<number> = this.store.select(selectItems);
  displayedColumns: string[] = ['productName', 'price', 'quantity', 'delete'];

  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  constructor(private activatedRouter: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.getAllProducts();
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
}
