import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { IPageRequest } from '../../shared/interfaces/product-listinterface';
import { Store } from '@ngrx/store';
import { getAllSoldProducts } from '../../store/action';
import { Observable } from 'rxjs';
import { selectItems, selectSoldProducts } from '../../store/reducer';
import { ISoldProducts } from '../../shared/interfaces/sold-product.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sold-product',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    TranslateModule
  ],
  templateUrl: './sold-product.component.html',
  styleUrl: './sold-product.component.scss',
})
export class SoldProductComponent implements OnInit {
  item$: Observable<number> = this.store.select(selectItems);
  soldProducts$: Observable<ISoldProducts[]> =
    this.store.select(selectSoldProducts);

  displayedColumns: string[] = [
    'productname',
    'price',
    'quantity',
    'totalprice',
    'solddata',
  ];

  pagination: IPageRequest = {
    page: 1,
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAllSoldProducts();
  }

  getAllSoldProducts() {
    this.store.dispatch(
      getAllSoldProducts.getAllSoldProductsAction({
        IPageRequest: this.pagination,
      })
    );
  }

  onEdit() {}

  onPageChange($event: PageEvent) {
    this.pagination = {
      ...this.pagination,
      page: $event.pageIndex + 1,
    };

    this.getAllSoldProducts();
  }
}
