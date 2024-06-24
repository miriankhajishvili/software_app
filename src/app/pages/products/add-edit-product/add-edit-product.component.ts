import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createProduct } from '../../../store/action';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  onEditClicked!: boolean;
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    quantity: new FormControl(),
    price: new FormControl(),
    managers: new FormControl(null),
  });

  managers = [
    { id: 1, name: 'Manager 1' },
    { id: 2, name: 'Manager 2' },
    { id: 3, name: 'Manager 3' },
  ];

  constructor(private store: Store, private productService: ProductService) {}

  ngOnInit(): void {
    console.log(this.data)
    this.form.patchValue(this.data);
  }

  onEditClick() {}

  onAddProduct() {
    const formValue = this.form.value;
    formValue.managers = [+formValue.managers]; // Convert string to number

    this.store.dispatch(createProduct.createProduct({ form: this.form.value }));
    this.form.reset();
  }
}
