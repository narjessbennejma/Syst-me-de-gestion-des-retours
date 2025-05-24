import { UserRef } from './user-ref.model';
import { RetourProduit } from './retour-produit.model';

export interface HistoriqueRetour {
  id?: number;
  retour: RetourProduit;
  action: string;
  user: UserRef;
  date: string; 
}
