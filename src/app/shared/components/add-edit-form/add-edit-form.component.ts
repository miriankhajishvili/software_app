import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createManager, createProduct, editProduct } from '../../../store/action';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
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
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
  ],
  templateUrl: './add-edit-form.component.html',
  styleUrl: './add-edit-form.component.scss',
})
export class AddEditFormComponent implements OnInit {
  readonly data = inject<any>(MAT_DIALOG_DATA);


  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, positiveNumberValidator()]),
    price: new FormControl('', [Validators.required, positiveNumberValidator()]),
    managers: new FormControl([]),  // Updated to handle multiple selections
  });

  managerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, lettersOnlyValidator()]),
    lastname: new FormControl('', [Validators.required, lettersOnlyValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
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
  toppings = new FormControl('');
  allmanagers = [
    { id: 1, name: 'Manager 1' },
    { id: 2, name: 'Manager 2' },
    { id: 3, name: 'Manager 3' },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form.patchValue(this.data);
    console.log(this.data)
  }

  onAddProduct() {
    const formValue = this.form.value;
    formValue.price = +formValue.price;
    formValue.quantity = +formValue.quantity;
    this.store.dispatch(createProduct.createProduct({ form: this.form.value }));
    this.form.reset();
  }

  onAddManager() {
    this.store.dispatch(createManager.createManagerAction({ form: this.managerForm.value }));
    this.
    managerForm.reset();
  }

  onEditProduct(){
    console.log(this.data)
   this.store.dispatch(editProduct.editProductAction({form: this.form.value, id: this.data.id}))
   this.form.reset()
  }
}