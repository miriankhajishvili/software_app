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
  constructor(public dialog: MatDialog) {}

  onAddProduct() {
    this.onAddManagerClick = false;
    this.dialog.open(AddEditFormComponent, {
      data: {
        onlcick: this.onAddManagerClick,
      },
    });
  }
  onAddManager() {
    this.onAddManagerClick = true;
    this.dialog.open(AddEditFormComponent, {
      data: {
        onclick: this.onAddManagerClick,
      },
    });
  }
}
