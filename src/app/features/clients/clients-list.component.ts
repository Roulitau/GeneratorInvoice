import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clients-container">
      <div class="header">
        <h2>Gestion des clients</h2>
        <button class="btn-primary">Ajouter un client</button>
      </div>
      
      <div class="clients-grid" *ngIf="clients.length > 0">
        <div class="client-card" *ngFor="let client of clients">
          <div class="client-header">
            <h3>{{ client.nom }}</h3>
            <div class="client-actions">
              <button class="btn-edit">Modifier</button>
              <button class="btn-delete">Supprimer</button>
            </div>
          </div>
          
          <div class="client-info">
            <p><strong>Contact:</strong> {{ client.contact }}</p>
            <p><strong>Email:</strong> {{ client.email }}</p>
            <p><strong>Téléphone:</strong> {{ client.telephone }}</p>
            <p><strong>Adresse:</strong> {{ client.adresse.rue }}, {{ client.adresse.ville }}</p>
            <p *ngIf="client.siret"><strong>SIRET:</strong> {{ client.siret }}</p>
          </div>
        </div>
      </div>
      
      <div class="empty-state" *ngIf="clients.length === 0">
        <p>Aucun client trouvé. Commencez par ajouter votre premier client.</p>
      </div>
    </div>
  `,
  styles: [`
    .clients-container {
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
    
    .clients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }
    
    .client-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .client-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .client-header h3 {
      margin: 0;
      color: #1e40af;
    }
    
    .client-actions {
      display: flex;
      gap: 10px;
    }
    
    .btn-edit, .btn-delete {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
    }
    
    .btn-edit {
      background-color: #10b981;
      color: white;
    }
    
    .btn-delete {
      background-color: #ef4444;
      color: white;
    }
    
    .client-info p {
      margin: 8px 0;
      font-size: 0.9rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #666;
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
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  
  constructor(private clientService: ClientService) {}
  
  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }
}