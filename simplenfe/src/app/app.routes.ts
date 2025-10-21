import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'app/:id',
    loadComponent: () =>
      import('./pages/initial-page/initial-page.component').then(
        (m) => m.InitialPageComponent
      ),
  },
];
