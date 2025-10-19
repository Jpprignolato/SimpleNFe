import { Routes } from '@angular/router';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';

export const routes: Routes = [
<<<<<<< HEAD
    {path: '', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)},
=======
  {
    path: '', component: InitialPageComponent
  }
>>>>>>> origin/homologacao
];
