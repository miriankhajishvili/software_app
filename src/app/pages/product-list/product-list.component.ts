import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../shared/services/product.service';
import { pageRequest } from '../../shared/interfaces/product-list';
import { Store } from '@ngrx/store';

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
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products$: any[] = [];
  items!: number;
  currentPage: number = 0;
  displayedColumns: string[] = ['productName', 'Price', 'role', 'profile'];
  page: number = +this.activatedRouter.snapshot.queryParams['page'] || 1;
  first: number = this.page * 10 - 10;

  pagination: pageRequest = {
    page: this.page,
    row: 10,
    search: '',
    sort: '',
  };

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private store: Store
  ) {}

  handlePageEvent($event: any) {}
  ngOnInit(): void {}

  getAllClients() {
    this.store.dispatch(this.getAllClients({ pageRequest: this.pagination }));
  }
}
