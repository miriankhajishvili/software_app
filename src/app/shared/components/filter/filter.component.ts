import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { pageRequest } from '../../interfaces/product-list';
import { Store } from '@ngrx/store';
import { getAllManagers } from '../../../store/action';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  pagination: pageRequest = {
    page: 1,
    row: 10,
    firstname: '',
    lastname: '',
  };

  managerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onProductFilter() {
    this.pagination = {
      ...this.pagination,
      firstname: this.managerForm.value.firstname,
      lastname: this.managerForm.value.lastname
    };

    this.store.dispatch(
      getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    );
  }
}
