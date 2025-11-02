import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  templateUrl: './invoice.create.component.html',
  styleUrls: ['./invoice.create.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  clients: Client[] = [];
  currentStep = 1;
  totalSteps = 3;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {
    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      numero: ['', Validators.required],
      dateEmission: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      articles: this.fb.array([]),
      notes: ['']
    });
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log('Facture créée:', this.invoiceForm.value);
      // Ici vous pouvez ajouter la logique pour sauvegarder la facture
    }
  }

  getSelectedClientName(): string {
    const clientId = this.invoiceForm.get('clientId')?.value;
    if (clientId) {
      const client = this.clients.find(c => c.id == clientId);
      return client ? client.nom : '';
    }
    return '';
  }
}