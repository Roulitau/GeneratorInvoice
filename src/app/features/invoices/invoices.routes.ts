import { Routes } from '@angular/router';

export const INVOICES_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./invoice-list/invoices.list.component').then(m => m.InvoicesListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./invoice-create/component/invoice.create.component').then(m => m.InvoiceCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./invoice-detail/invoice.detail.component').then(m => m.InvoiceDetailComponent)
  }
];