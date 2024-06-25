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
import { Observable } from 'rxjs';
import { IManagers } from '../../shared/interfaces/manager.interface';
import { selectManagers } from '../../store/reducer';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

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
    NavigationComponent,
  ],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.scss',
})
export class ManagersComponent implements OnInit {
  managers$: Observable<IManagers[]> = this.store.select(selectManagers);

  displayedColumns: string[] = [
    'name',
    'price',
    'totalPriceOfSellingProducts',
    'delete',
  ];
  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  constructor(private store: Store, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllManagers();
  }

  getAllManagers() {
    this.store.dispatch(
      getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    );
  }

  onAddManagers() {}

  onEdit() {}

  onDelete(manager: IManagers) {
    this.matDialog.open(DeleteConfirmDialogComponent, {
      data: {
        id: manager.id,
        onManagerDelete: true
      },
    });
  }

  onPageChange() {}
}
