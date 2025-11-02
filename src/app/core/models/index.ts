export interface Adresse {
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;
}

export interface Client {
  id: number;
  nom: string;
  contact: string;
  email: string;
  telephone: string;
  adresse: Adresse;
  siret?: string;
  tva?: string;
  dateCreation: string;
}

export interface Article {
  id: number;
  description: string;
  quantite: number;
  prixUnitaire: number;
  tva: number;
}

export interface Facture {
  id: number;
  numero: string;
  clientId: number;
  dateEmission: string;
  dateEcheance: string;
  statut: 'brouillon' | 'envoyee' | 'payee' | 'annulee';
  articles: Article[];
  remise: number;
  notes?: string;
}