import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ILogin, ILoginRespons } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  get token(): string | null {
    return localStorage.getItem('token');
  }

  login(formValue: ILogin): Observable<ILoginRespons> {
    return this.post<ILoginRespons>('auth/login', formValue).pipe(
      tap((response: ILoginRespons) => {
        this.setToken(response.accessToken);
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
