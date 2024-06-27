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
import { IGetAllProducts,  IGetAllProductsList,  IPageRequest } from '../../interfaces/product-listinterface';
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

   pagination: IPageRequest = {
    page: 1,

  };
  managerForm: FormGroup = new FormGroup({
    firstNameSearch: new FormControl(''),
    lastNameSearch: new FormControl(''),
    totalPriceMin: new FormControl(''),
    totalPriceMax: new FormControl(''),
    registrationDateFrom: new FormControl(''),
    registrationDateTo: new FormControl(''),
  });

  productControl: FormControl = new FormControl('');
  

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onManagerFilter() {
    this.pagination = {
      ...this.pagination,
    ...this.managerForm.value
    };

    this.store.dispatch(
      getAllManagers.getAllManagersAction({ IPageRequest: this.pagination })
    );
    console.log(this.managerForm.value);
    this.dialog.closeAll();
  }

  onProductFilter() {
    
    const productRequest : IGetAllProductsList = {
      ...this.pagination,
      search: this.productControl.value,
      
    }
   
    this.store.dispatch(
      getAllProducts.getAllProductsAction({ IPageRequest: productRequest})
    );
    this.dialog.closeAll();


  }

  onClearFilters() {
    this.managerForm.reset();
    this.productControl.reset();
  }
}
