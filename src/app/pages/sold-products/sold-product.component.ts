import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { pageRequest } from '../../shared/interfaces/product-list';
import { Store } from '@ngrx/store';
import { getAllSoldProducts } from '../../store/action';

@Component({
  selector: 'app-sold-product',
  standalone: true,
  imports: [CommonModule, NavigationComponent, MatButtonModule, MatPaginator, MatTableModule],
  templateUrl: './sold-product.component.html',
  styleUrl: './sold-product.component.scss'
})
export class SoldProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'delete'];

  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  constructor(private store:Store){}

  ngOnInit(): void {
      this.getAllProducts()
  }

  getAllProducts() {
    this.store.dispatch(
      getAllSoldProducts.getAllSoldProductsAction({ pageRequest: this.pagination })
    );
  }


  onEdit(){}

  onDelete(){}

  onPageChange(){}

}
