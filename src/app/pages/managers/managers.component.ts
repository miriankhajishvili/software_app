import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAllManagers } from '../../store/action';
import { pageRequest } from '../../shared/interfaces/product-list';

@Component({
  selector: 'app-managers',
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
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.scss',
})
export class ManagersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'delete'];
  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getAllManagers()
  }

  getAllManagers() {
    this.store.dispatch(
      getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    );
  }

  onAddManagers() {}

  onEdit() {}

  onDelete() {}

  onPageChange() {}
}
