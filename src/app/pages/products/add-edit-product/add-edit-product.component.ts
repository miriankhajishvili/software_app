import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createProduct } from '../../../store/action';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  onEditClicked!: boolean;

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

    this.productService.onEditClick$.subscribe(res => console.log(res))

    this.pathFormValue();
  }

  pathFormValue() {
    this.productService.currentProduct$.subscribe((res) =>
      this.form.patchValue(res)
    );
  }

  onEditClick() {}

  onAddProduct() {
    const formValue = this.form.value;
    formValue.managers = [+formValue.managers]; // Convert string to number

    this.store.dispatch(createProduct.createProduct({ form: this.form.value }));
    this.form.reset();
  }
}
