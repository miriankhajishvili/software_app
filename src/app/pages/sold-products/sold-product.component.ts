import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { pageRequest } from '../../shared/interfaces/product-list';
import { Store } from '@ngrx/store';
import { getAllSoldProducts } from '../../store/action';
import { Observable, tap } from 'rxjs';
import { selectItems, selectSoldProducts } from '../../store/reducer';
import {
  IGetAllSoldProducts,
  ISoldProducts,
} from '../../shared/interfaces/sold-product.interface';

@Component({
  selector: 'app-sold-product',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
  ],
  templateUrl: './sold-product.component.html',
  styleUrl: './sold-product.component.scss',
})
export class SoldProductComponent implements OnInit {
  item$: Observable<number> = this.store.select(selectItems);
  soldProducts$: Observable<ISoldProducts[]> =
    this.store.select(selectSoldProducts);

  displayedColumns: string[] = ['productname', 'price', 'quantity', 'totalprice', 'solddata'];

  pagination: pageRequest = {
    page: 1,
    row: 10,
    firstname: '',
    lastname: '',
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  getAllSoldProducts() {
    this.store.dispatch(
      getAllSoldProducts.getAllSoldProductsAction({
        pageRequest: this.pagination,
      })
    );
  }

  onEdit() {}

  onDelete() {}

  onPageChange($event: any) {
    this.pagination = {
      ...this.pagination,
      page: $event.pageIndex + 1,
    };

    this.getAllSoldProducts();
  }
}
