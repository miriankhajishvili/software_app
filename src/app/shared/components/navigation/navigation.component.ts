import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  onAddManagerClick?: boolean;
  onAddProduckClick?: boolean;
  constructor(public dialog: MatDialog) {}

  onAddProduct() {
    this.onAddProduckClick = true;
    this.dialog.open(AddEditFormComponent, {
      data: {
        onAddProduckClick: this.onAddProduckClick,
      },
    });
  }
  onAddManager() {
    this.onAddManagerClick = true;
    this.dialog.open(AddEditFormComponent, {
      data: {
        onAddManagerClick: this.onAddManagerClick,
      },
    });
  }
}
