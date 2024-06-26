import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData: string | null = localStorage.getItem('Role');

  if (localData) {
    router.navigate(['/products']);
    return false;
  } else {
    return true;
  }
};
