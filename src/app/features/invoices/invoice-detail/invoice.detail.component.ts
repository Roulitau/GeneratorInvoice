import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  template: `
    <div class="invoice-detail-container">
      <h2>Détail de la facture</h2>
      <p>Détails de la facture à venir...</p>
    </div>
  `,
  styles: [`
    .invoice-detail-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class InvoiceDetailComponent {}