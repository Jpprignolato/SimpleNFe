import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Verifica se está no ambiente do navegador
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (!isBrowser) {
    // Ambiente de build/SSR -> não redireciona, apenas retorna falso
    return false;
  }

  const token = localStorage.getItem('token');

  if (token) {
    console.log('Token atual:', token);
    return true;
  } else {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
};
