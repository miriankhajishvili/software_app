import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
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
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

constructor(private router:Router){

}

  onLogOut(){

    localStorage.removeItem('token')
    this.router.navigate(['auth/login'])
  }
}
