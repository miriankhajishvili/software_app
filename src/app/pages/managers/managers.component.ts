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
import { selectItems, selectManagers } from '../../store/reducer';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddEditFormComponent } from '../../shared/components/add-edit-form/add-edit-form.component';
import { FilterComponent } from '../../shared/components/filter/filter.component';

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
  item$: Observable<number> = this.store.select(selectItems);

  displayedColumns: string[] = [
    'manager',
    'registrationData',
    'totalPriceOfSellingProducts',
    'buttons',
  ];
 pagination: pageRequest = {
    page: 1,
   
   
  };


  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllManagers()
  }

  onEditManager(manager: IManagers) {
    this.dialog.open(AddEditFormComponent, {
      data: {
        firstName: manager.firstName,
        lastName: manager.lastName,
        email: manager.email,
        password: manager.password,
        onEditManagerClick: true,
      },
    });
    console.log(manager);
  }

  onDelete(manager: IManagers) {
    this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        id: manager.id,
        onManagerDelete: true,
      },
    });
  }

  onPageChange($event: any) {
    this.pagination = {
      ...this.pagination,
      page: $event.pageIndex + 1,
    };
    this.getAllManagers();
  }

  getAllManagers() {
    this.store.dispatch(
      getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    );
  }

  onManagerFilterClick() {
    this.dialog.open(FilterComponent, {
      data: { onManagerFilterClick : true },
    });
  }
}
