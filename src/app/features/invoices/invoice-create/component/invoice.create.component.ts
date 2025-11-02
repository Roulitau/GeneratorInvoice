import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
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
  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      numero: ['', Validators.required],
      dateEmission: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      category: [''], // Ajout du contrôle pour la catégorie
      nombrePrestations: [1, [Validators.required, Validators.min(1), Validators.max(10)]], // Nombre de prestations
      prestations: this.fb.array([]), // Array des prestations
      tvaActive: [false], // Toggle pour activer/désactiver la TVA
      tauxTva: [20, [Validators.min(0), Validators.max(100)]], // Taux de TVA par défaut 20%
      articles: this.fb.array([]),
      notes: [''],
    });

    // Initialiser avec une prestation par défaut
    this.initializePrestations(1);

    // Écouter les changements du nombre de prestations
    this.invoiceForm.get('nombrePrestations')?.valueChanges.subscribe((nombre) => {
      if (nombre && nombre >= 1 && nombre <= this.maxPrestations) {
        this.updatePrestationsArray(nombre);
      }
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

  categories: string[] = ['Transport', 'FFCK', 'CDNCK', 'Prestation'];

  maxPrestations = 10;

  ngOnInit() {
    console.log('Chargement des clients depuis clients.json...');

    // Charger les clients depuis le fichier JSON via le service
    this.clientService.getClients().subscribe({
      next: (clients) => {
        console.log('Clients reçus du service:', clients);
        this.clients = clients;
        if (clients.length === 0) {
          console.warn('Aucun client trouvé dans le fichier JSON');
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients:', error);
        this.clients = [];
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
        if (
          this.invoiceForm.get('category')?.value !== '' &&
          this.areAllPrestationsValid()
        ) {
          result = true;
        }
        return result;
      case 3:
        return result;
      default:
        return false;
    }
  }

  // Getter pour accéder au FormArray des prestations
  get prestations(): FormArray {
    return this.invoiceForm.get('prestations') as FormArray;
  }

  // Initialiser le FormArray avec le nombre spécifié de prestations
  initializePrestations(nombre: number): void {
    const prestationsArray = this.prestations;
    prestationsArray.clear();
    
    for (let i = 0; i < nombre; i++) {
      prestationsArray.push(this.createPrestationFormGroup());
    }
  }

  // Créer un FormGroup pour une prestation
  createPrestationFormGroup(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  // Mettre à jour le FormArray selon le nombre de prestations choisi
  updatePrestationsArray(nombrePrestations: number): void {
    const prestationsArray = this.prestations;
    const currentLength = prestationsArray.length;

    if (nombrePrestations > currentLength) {
      // Ajouter des prestations
      for (let i = currentLength; i < nombrePrestations; i++) {
        prestationsArray.push(this.createPrestationFormGroup());
      }
    } else if (nombrePrestations < currentLength) {
      // Supprimer des prestations
      for (let i = currentLength - 1; i >= nombrePrestations; i--) {
        prestationsArray.removeAt(i);
      }
    }
  }

  // Vérifier si toutes les prestations sont valides
  areAllPrestationsValid(): boolean {
    const prestationsArray = this.prestations;
    return prestationsArray.controls.every(prestation => prestation.valid);
  }

  // Calculer le montant total des prestations
  getTotalMontantPrestations(): number {
    const prestationsArray = this.prestations;
    return prestationsArray.controls.reduce((total, prestation) => {
      const montant = prestation.get('montant')?.value;
      return total + (montant ? parseFloat(montant) : 0);
    }, 0);
  }

  // Générer un tableau d'options pour le select
  getPrestationOptions(): number[] {
    return Array.from({ length: this.maxPrestations }, (_, i) => i + 1);
  }

  // Vérifier si la TVA est activée
  isTvaActive(): boolean {
    return this.invoiceForm.get('tvaActive')?.value || false;
  }

  // Obtenir le taux de TVA
  getTauxTva(): number {
    return this.invoiceForm.get('tauxTva')?.value || 20;
  }

  // Calculer le montant HT total
  getMontantHT(): number {
    return this.getTotalMontantPrestations();
  }

  // Calculer le montant de la TVA
  getMontantTVA(): number {
    if (!this.isTvaActive()) {
      return 0;
    }
    const montantHT = this.getMontantHT();
    const tauxTva = this.getTauxTva();
    return montantHT * (tauxTva / 100);
  }

  // Calculer le montant TTC
  getMontantTTC(): number {
    const montantHT = this.getMontantHT();
    const montantTVA = this.getMontantTVA();
    return montantHT + montantTVA;
  }

  // Obtenir les taux de TVA prédéfinis
  getTauxTvaPredefinis(): number[] {
    return [0, 5.5, 10, 20];
  }
}
