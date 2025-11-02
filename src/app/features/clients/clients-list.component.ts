import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./clients-list.component.html`,
  styleUrls: [`./clients-list.component.css`]
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