import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  template: `
    <div class="invoice-create-container">
      <h2>Créer une nouvelle facture</h2>
      <p>Formulaire de création de facture à venir...</p>
    </div>
  `,
  styles: [`
    .invoice-create-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class InvoiceCreateComponent {}