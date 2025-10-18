import { Routes } from '@angular/router';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';

export const routes: Routes = [
  {
    path: '',
    component: InitialPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'nfe',
        pathMatch: 'full'
      },
      {
        path: 'nfe',
        loadComponent: () => import('./pages/nfe/nfe.component').then(m => m.NfeComponent)
      }
    ]
  }
];
