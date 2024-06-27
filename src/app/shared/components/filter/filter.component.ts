import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { pageRequest } from '../../interfaces/product-list';
import { Store } from '@ngrx/store';
import { getAllManagers, getAllProducts } from '../../../store/action';

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
    MatDialogModule,
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
    from: 0,
    to: 0,
    registerFrom: Date,
    registerTo: Date,
    product: 'string'
  };




  managerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    soldProductFrom: new FormControl(''),
    soldProductTo: new FormControl(''),
    registerDataFrom: new FormControl(''),
    registerDataTo: new FormControl(''),
  });

  productControl: FormControl = new FormControl('');

  constructor(private store: Store , private dialog: MatDialog) {}

  ngOnInit(): void {}

  onManagerFilter() {
    this.pagination = {
      ...this.pagination,
      firstname: this.managerForm.value.firstname,
      lastname: this.managerForm.value.lastname,
      from: this.managerForm.value.soldProductFrom,
      to: this.managerForm.value.soldProductTo,
      registerFrom: this.managerForm.value.registerDataFrom,
      registerTo: this.managerForm.value.registerDataTo,
    };

    this.store.dispatch(
      getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    );
    console.log(this.managerForm.value);
    this.dialog.closeAll()
  }

  onProductFilter(){
    this.pagination = {
      ...this.pagination,
      product: this.productControl.value
    }

    console.log(this.productControl.value)
    this.store.dispatch(
      getAllProducts.getAllProductsAction({ pageRequest: this.pagination })
    );
    this.dialog.closeAll()
  }

  onClearFilters() {
    this.managerForm.reset();
    this.productControl.reset()
  }
  
}
