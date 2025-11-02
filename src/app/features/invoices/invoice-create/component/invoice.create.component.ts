import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-invoice-create',
  standalone: true,
  templateUrl: './invoice.create.component.html',
  styleUrls: ['./invoice.create.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
})
export class InvoiceCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {
    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      numero: ['', Validators.required],
      dateEmission: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      category: [''], // Ajout du contrôle pour la catégorie
      articles: this.fb.array([]),
      notes: [''],
    });

    // Écouter les changements du client pour générer automatiquement le numéro
    this.invoiceForm.get('clientId')?.valueChanges.subscribe((clientId) => {
      if (clientId) {
        const newInvoiceNumber = this.generateInvoiceNumber();
        this.invoiceForm.get('numero')?.setValue(newInvoiceNumber);
      }
    });
  }

  invoiceForm: FormGroup;

  clients: Client[] = [];

  currentStep = 1;

  totalSteps = 3;

  categories: string[] = ['Transport', 'FFCK', 'CDNCK', 'Presta'];

  ngOnInit() {
    console.log('Chargement des clients...');

    // Test avec des données statiques d'abord
    const testClients: Client[] = [
      {
        id: 1,
        nom: 'Entreprise ABC',
        contact: 'Jean Dupont',
        email: 'jean.dupont@abc.com',
        telephone: '01 23 45 67 89',
        adresse: {
          rue: '123 Rue de la Paix',
          ville: 'Paris',
          codePostal: '75001',
          pays: 'France',
        },
        siret: '12345678901234',
        tva: 'FR12345678901',
        dateCreation: '2024-01-15',
      },
      {
        id: 2,
        nom: 'Société XYZ',
        contact: 'Marie Martin',
        email: 'marie.martin@xyz.fr',
        telephone: '01 98 76 54 32',
        adresse: {
          rue: '456 Avenue des Champs',
          ville: 'Lyon',
          codePostal: '69000',
          pays: 'France',
        },
        siret: '98765432109876',
        tva: 'FR98765432109',
        dateCreation: '2024-02-20',
      },
    ];

    this.clients = testClients;
    console.log('Clients statiques chargés:', this.clients);

    // Essayons aussi le service
    this.clientService.getClients().subscribe({
      next: (clients) => {
        console.log('Clients reçus du service:', clients);
        if (clients && clients.length > 0) {
          this.clients = clients;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients:', error);
      },
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
      const client = this.clients.find((c) => c.id == clientId);
      return client ? client.nom : '';
    }
    return '';
  }

  getSelectedClientCode(): string {
    const clientId = this.invoiceForm.get('clientId')?.value;
    if (clientId) {
      const client = this.clients.find((c) => c.id == clientId);
      if (client) {
        // Créer un code à partir du nom du client (3 premières lettres en majuscules)
        return client.nom.substring(0, 3).toUpperCase().replace(/\s/g, '');
      }
    }
    return 'XXX';
  }

  generateInvoiceNumber(): string {
    const clientCode = this.getSelectedClientCode();
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    return `FACT-${clientCode}-${year}-${month}-00X`;
  }

  canProceedToNextStep(): boolean {
    let result = false;
    switch (this.currentStep) {
      case 1:
        if (
          this.invoiceForm.get('clientId')?.valid &&
          this.invoiceForm.get('numero')?.valid &&
          this.invoiceForm.get('dateEmission')?.valid &&
          this.invoiceForm.get('dateEcheance')?.valid
        ) {
          result = true;
        }
        return result;
      case 2:
        return result;
      case 3:
        return result;
      default:
        return false;
    }
  }
}
