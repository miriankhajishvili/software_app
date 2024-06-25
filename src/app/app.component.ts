import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgToastModule } from 'ng-angular-popup';
import { getAllManagers } from './store/action';
import { pageRequest } from './shared/interfaces/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgToastModule],
  template: '<router-outlet></router-outlet>, <ng-toast></ng-toast>',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  constructor(private store: Store){}

  ngOnInit(): void {
    // this.store.dispatch(
    //   getAllManagers.getAllManagersAction({ pageRequest: this.pagination })
    // );
  }
}
