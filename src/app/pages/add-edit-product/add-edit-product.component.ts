import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createProduct } from '../../store/action';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup = new FormGroup({
    productName: new FormControl(),
    productPrice: new FormControl(),
    productQuantity: new FormControl(),
    manager: new FormControl
  });

  constructor(
    private store: Store,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.productService.currentProduct$.subscribe(res => this.form.patchValue(res))
  }

  onAddProduct() {
    console.log(this.form.value);
    this.store.dispatch(createProduct.createProduct({ form: this.form.value }));
    this.form.reset();
  }
}
