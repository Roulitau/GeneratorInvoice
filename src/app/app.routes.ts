import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'clients',
    loadComponent: () => import('./features/clients/clients-list.component').then(m => m.ClientsListComponent)
  },
  {
    path: 'invoices',
    loadChildren: () => import('./features/invoices/invoices.routes').then(m => m.INVOICES_ROUTES)
  }
];
