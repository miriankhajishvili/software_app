import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AddEditProductComponent } from '../../../pages/products/add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  onAddManagerClick?: boolean;
  constructor(public dialog: MatDialog) {}

  onAddProduct() {
    this.onAddManagerClick = false;
    this.dialog.open(AddEditProductComponent, {
      data: {
        onlcick: this.onAddManagerClick,
      },
    });
  }
  onAddManager() {
    this.onAddManagerClick = true;
    this.dialog.open(AddEditProductComponent, {
      data: {
        onclick: this.onAddManagerClick,
      },
    });
  }
}
