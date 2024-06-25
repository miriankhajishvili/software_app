import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogOutDialogComponent } from '../../shared/components/log-out-dialog/log-out-dialog.component';
import { pageRequest } from '../../shared/interfaces/product-list';
import { Store } from '@ngrx/store';
import { getAllManagers } from '../../store/action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  currentRole = localStorage.getItem('Role');

  constructor(private dialog: MatDialog, private store: Store) {}



  openDialog() {
    this.dialog.open(LogOutDialogComponent);
  }

  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };



  ngOnInit(): void {
    this.getAllManagers()
    
  }

  getAllManagers(){
    this.store.dispatch(
      getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    );
  }
}
