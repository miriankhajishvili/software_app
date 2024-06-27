import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  IGetAllProductsList,
  IProduct,
  IProductResponse,
} from '../../shared/interfaces/product-listinterface';
import { Store } from '@ngrx/store';
import { getAllProducts } from '../../store/action';
import { Observable, take, tap } from 'rxjs';
import { selectItems, selectProducts } from '../../store/reducer';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { AddEditFormComponent } from '../../shared/components/add-edit-form/add-edit-form.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';

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
    NavigationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductListComponent implements OnInit {
  products$: Observable<IProductResponse[]> = this.store.select(selectProducts);
  item$: Observable<number> = this.store.select(selectItems);
  userRole = localStorage.getItem('Role');

  displayedColumns: string[] = ['name', 'price', 'quantity', 'buttons'];

  pagination: IGetAllProductsList = {
    page: 1,
  };

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.store.dispatch(
      getAllProducts.getAllProductsAction({ IPageRequest: this.pagination })
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
    this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        id: product.id,
      },
    });
  }

  onEditProduct(product: IProduct) {
    this.dialog.open(AddEditFormComponent, {
      data: {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        managers: product.managers.map((manager) => manager.id),
        onEditProductClick: true,
      },
    });
  }

  onSellProduct(product: IProduct) {
    this.dialog
      .open(AddEditFormComponent, {
        data: {
          id: product.id,
          quantity: product.quantity,
          onSellProductClick: true,
        },
      })
      .afterClosed()
      .pipe(
        take(1),
        tap((res) => this.getAllProducts())
      )
      .subscribe();
  }

  onProductFilterClick() {
    this.dialog.open(FilterComponent, {
      data: { onProductFilterClick: true },
    });
  }
}
