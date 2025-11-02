import { Component } from '@angular/core';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  template: `
    <div class="invoices-container">
      <div class="header">
        <h2>Mes factures</h2>
        <button class="btn-primary">Créer une facture</button>
      </div>
      
      <div class="invoices-table">
        <p>Liste des factures à venir...</p>
      </div>
    </div>
  `,
  styles: [`
    .invoices-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .btn-primary {
      background-color: #1e40af;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
    }
  `]
})
export class InvoicesListComponent {}