import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // 🧠 Verifica se estamos realmente no browser (evita erros no SSR ou testes)
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  if (!isBrowser) return false;

  const token = localStorage.getItem('token');

  // 🔒 Caso não exista token, redireciona para login
  if (!token) {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  try {
    // 📦 Decodifica o payload do JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp ? payload.exp * 1000 : null; // exp em segundos → ms

    // ⏳ Verifica se o token está expirado
    if (exp && Date.now() > exp) {
      console.warn('Token expirado, redirecionando para login...');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    // ✅ Token válido → acesso liberado
    return true;

  } catch (err) {
    console.error('Erro ao validar token:', err);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }
};
