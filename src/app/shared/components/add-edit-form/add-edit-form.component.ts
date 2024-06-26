import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, compose } from '@ngrx/store';
import {
  createManager,
  createProduct,
  editManager,
  editProduct,
  sellProduct,
} from '../../../store/action';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { lettersOnlyValidator } from '../../regex/lettersOnlyValidator';
import { positiveNumberValidator } from '../../regex/nonNegativeNumberValidator';
import { selectManagers } from '../../../store/reducer';
import { Observable, tap } from 'rxjs';
import { IManagers } from '../../interfaces/manager.interface';
import { ProductService } from '../../services/product.service';
import { singleLanguageValidator } from '../../regex/georgianLettersValidator';

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
  readonly dialogRef = inject(MatDialogRef<AddEditFormComponent>);

  allManagers$: Observable<IManagers[]> = this.store.select(selectManagers).pipe(tap( console.log));

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,  singleLanguageValidator()],),
    quantity: new FormControl('', [
      Validators.required,
      positiveNumberValidator(),
    
    ]),
    price: new FormControl('', [
      Validators.required,
      positiveNumberValidator(),
    ]),
    managers: new FormControl([]), // Updated to handle multiple selections
  });

  managerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      lettersOnlyValidator(),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      lettersOnlyValidator(),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
  });

  sellMyProduct = new FormControl('', [Validators.required,  positiveNumberValidator()])

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
    return this.managerForm.get('firstName');
  }
  get lastname() {
    return this.managerForm.get('lastName');
    
  }

  get email() {
    return this.managerForm.get('email');
  }

  get password() {
    return this.managerForm.get('password');
  }

  get sellProduct() {
    return this.sellMyProduct.get('sellMyProduct');
  }


  constructor(private store: Store, private productService:ProductService) {}

  ngOnInit(): void {
   
    this.form.patchValue(this.data);
    this.managerForm.patchValue(this.data)
    

    console.log(this.sellMyProduct)
  }

  onAddProduct() {
    const formValue = this.form.value;
    formValue.price = +formValue.price;
    formValue.quantity = +formValue.quantity;
    this.store.dispatch(createProduct.createProduct({ form: this.form.value }));
    this.form.reset();
    this.dialogRef.close()
  }

  onAddManager() {
    this.store.dispatch(
      createManager.createManagerAction({ form: this.managerForm.value })
    );
    console.log(this.managerForm.value);
    this.dialogRef.close()
    this.managerForm.reset();
  
  }

  onEditProduct() {
    const formValue = this.form.value;
    formValue.price = +formValue.price;
    formValue.quantity = +formValue.quantity;
    const obj = this.form.value
    obj.id = this.data.id
    
    this.store.dispatch(
      editProduct.editProductAction({ form: obj, })
    );
    this.dialogRef.close()
    this.form.reset();
  }

  onEditManager(){

    const obj = this.managerForm.value
    obj.id = this.data.id

    this.store.dispatch(editManager.editManager({ form: obj}))
    this.dialogRef.close()
    this.form.reset();
  } 

  onSellProduct(){
    console.log(this.data)
    this.store.dispatch(
      sellProduct.sellProduct({ quantity: +this.sellMyProduct.value! , id: this.data.id})
    );
    this.dialogRef.close()
  }

  onClose(){}

}
