import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private tokenKey = 'token';

  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removerToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
       const payload = JSON.parse(atob(token.split('.')[1]));
       return payload.sub;
    } catch (e) {
      console.log('Erro ao decodificar token:', e);
      return null;
    }
  }

  logout() {
    this.removerToken();
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
