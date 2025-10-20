import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [

    { path: '', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)},

    { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)},

    { path: 'home', 
        loadComponent: () => import('./pages/initial-page/initial-page.component').then(m => m.InitialPageComponent),
        canActivate: [AuthGuard]
    }
           
];
