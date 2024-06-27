import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';

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
  };




  ngOnInit(): void {


    // const defaultLange = localStorage.getItem('language') || 'en';
    // this.translateService.setDefaultLang(defaultLange)
    // this.currentLanguage = defaultLange
    // this.translateService.use(defaultLange)
  }


  // private translateService = inject(TranslateService)
  // currentLanguage!: string

  // changeLanguage(lang: string){
  //   this.translateService.use(lang);
  //   localStorage.setItem('language', lang)
  //   this.currentLanguage = lang
  // }
}
