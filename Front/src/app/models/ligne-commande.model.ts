import { Produit } from './produit';

export interface LigneCommande {
  produit: Produit;
  quantite: number;
  prix?: number;
}
