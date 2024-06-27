import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { deleteManager, deleteProduct } from '../../../store/action';
import { NgToastModule } from 'ng-angular-popup';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  readonly data = inject<{ id: number; onManagerDelete: boolean }>(
    MAT_DIALOG_DATA
  );

  currentUserId!: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getCurrentUsersId();
  }

  getCurrentUsersId() {}

  onYesClick() {
    if (this.data.onManagerDelete) {
      this.store.dispatch(
        deleteManager.deleteManagerAction({ id: this.data.id })
      );
    } else {
      this.store.dispatch(
        deleteProduct.deleteProductAction({ id: this.data.id })
      );
    }
  }
}
