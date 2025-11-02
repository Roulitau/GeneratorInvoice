import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  public clients$ = this.clientsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadClients();
  }

  private loadClients(): void {
    console.log('Service: Tentative de chargement des clients...');
    this.http.get<{clients: Client[]}>('/assets/data/clients.json')
      .subscribe({
        next: (data) => {
          console.log('Service: Données reçues:', data);
          this.clientsSubject.next(data.clients);
        },
        error: (error) => {
          console.error('Service: Erreur lors du chargement:', error);
        }
      });
  }

  getClients(): Observable<Client[]> {
    return this.clients$;
  }

  getClientById(id: number): Observable<Client | undefined> {
    return new Observable(observer => {
      this.clients$.subscribe(clients => {
        const client = clients.find(c => c.id === id);
        observer.next(client);
        observer.complete();
      });
    });
  }

  addClient(client: Omit<Client, 'id'>): void {
    const currentClients = this.clientsSubject.value;
    const newId = Math.max(...currentClients.map(c => c.id), 0) + 1;
    const newClient: Client = { ...client, id: newId };
    this.clientsSubject.next([...currentClients, newClient]);
  }

  updateClient(updatedClient: Client): void {
    const currentClients = this.clientsSubject.value;
    const index = currentClients.findIndex(c => c.id === updatedClient.id);
    if (index !== -1) {
      currentClients[index] = updatedClient;
      this.clientsSubject.next([...currentClients]);
    }
  }

  deleteClient(id: number): void {
    const currentClients = this.clientsSubject.value;
    const filteredClients = currentClients.filter(c => c.id !== id);
    this.clientsSubject.next(filteredClients);
  }
}