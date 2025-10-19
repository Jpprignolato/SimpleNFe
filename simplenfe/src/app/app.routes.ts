import { Routes } from '@angular/router';
import { NfeComponent } from './pages/nfe/nfe.component';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)},
    { path: 'home', loadComponent: () => import('./pages/initial-page/initial-page.component').then(m => m.InitialPageComponent)},
];
