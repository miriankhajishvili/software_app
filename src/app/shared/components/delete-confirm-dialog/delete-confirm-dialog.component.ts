import {
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { deleteProduct } from '../../../store/action';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
    NgToastModule,
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);

  currentUserId!: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private productService: ProductService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getCurrentUsersId();
  }

  getCurrentUsersId() {
   
  }

  onYesClick() {
    this.store.dispatch(
      deleteProduct.deleteProductAction({ id: this.currentUserId })
    );
  }
}
