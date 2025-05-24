import { Produit } from './produit';
import { UserRef } from './user-ref.model';
import { Commande } from './commande.model';

export interface RetourProduit {
  id?: number; 
  produit: Produit;
  client: UserRef;
  commande: { id: number }; 
  raison: string;
  etatTraitement?: string; 
  date: string; 
}

