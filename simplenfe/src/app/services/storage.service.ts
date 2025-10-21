import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setItem(key: string, value: string) {
    if (this.isBrowser()) localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    if (this.isBrowser()) return localStorage.getItem(key);
    return null;
  }

  removeItem(key: string) {
    if (this.isBrowser()) localStorage.removeItem(key);
  }

  clear() {
    if (this.isBrowser()) localStorage.clear();
  }
}
