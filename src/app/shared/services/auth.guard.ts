import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs'

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).getCurrentUser().pipe(map(user => user !== null));
};
