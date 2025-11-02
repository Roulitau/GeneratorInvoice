import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <h2>Tableau de bord</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Factures ce mois</h3>
          <p class="stat-number">12</p>
        </div>
        
        <div class="stat-card">
          <h3>Chiffre d'affaires</h3>
          <p class="stat-number">8 450 €</p>
        </div>
        
        <div class="stat-card">
          <h3>Factures en attente</h3>
          <p class="stat-number">3</p>
        </div>
        
        <div class="stat-card">
          <h3>Clients actifs</h3>
          <p class="stat-number">25</p>
        </div>
      </div>
      
      <div class="recent-activities">
        <h3>Activités récentes</h3>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-date">Aujourd'hui</span>
            <span class="activity-text">Facture FAC-2024-012 créée</span>
          </div>
          <div class="activity-item">
            <span class="activity-date">Hier</span>
            <span class="activity-text">Paiement reçu pour FAC-2024-011</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .stat-card h3 {
      color: #666;
      margin-bottom: 10px;
      font-size: 0.9rem;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #1e40af;
      margin: 0;
    }
    
    .recent-activities {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-top: 30px;
    }
    
    .activity-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    
    .activity-date {
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class DashboardComponent {}