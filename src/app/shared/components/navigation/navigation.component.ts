import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { Store } from '@ngrx/store';
import { IPageRequest } from '../../interfaces/product-listinterface';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  userRole = localStorage.getItem('Role');
  onAddManagerClick?: boolean;
  onAddProduckClick?: boolean;

  pagination: IPageRequest = {
    page: 1,
  };

  constructor(public dialog: MatDialog, private store: Store) {}

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
