import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createProduct } from '../../../store/action';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { lettersOnlyValidator } from '../../regex/lettersOnlyValidator';
import { positiveNumberValidator } from '../../regex/nonNegativeNumberValidator';

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
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
  ],
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss',
})
export class AddEditFormComponent implements OnInit {
  onEditClicked!: boolean;
  readonly data = inject<any>(MAT_DIALOG_DATA);

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, lettersOnlyValidator()]),
    quantity: new FormControl('',[Validators.required, positiveNumberValidator()]),
    price: new FormControl('',[Validators.required, positiveNumberValidator()]),
    managers: new FormControl(null),
  });

  managerForm: FormGroup = new FormGroup({
    firstname: new FormControl('',[Validators.required, lettersOnlyValidator()]),
    lastname: new FormControl('',[Validators.required, lettersOnlyValidator()]),
    password: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(15) ]),
  });

  get name() {
    return this.form.get('name');
  }
  get quantity() {
    return this.form.get('quantity');
  }

  get price() {
    return this.form.get('price');
  }
  get managers() {
    return this.form.get('managers');
  }

  get firstname() {
    return this.managerForm.get('firstname');
  }
  get lastname() {
    return this.managerForm.get('lastname');
  }
  get password() {
    return this.managerForm.get('password');
  }

  allmanagers = [
    { id: 1, name: 'Manager 1' },
    { id: 2, name: 'Manager 2' },
    { id: 3, name: 'Manager 3' },
  ];

  constructor(private store: Store, private productService: ProductService) {}

  ngOnInit(): void {
    console.log(this.data.onclick);
    this.form.patchValue(this.data);
  }

  onEditClick() {}

  onAddProduct() {
    const formValue = this.form.value;
    formValue.managers = [+formValue.managers]; // Convert string to number
    formValue.price = +formValue.price;
    formValue.quantity = +formValue.quantity;
    console.log(this.form.value);
    this.store.dispatch(createProduct.createProduct({ form: this.form.value }));
    this.form.reset();
  }
}
