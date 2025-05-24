import { LigneCommande } from './ligne-commande.model';
import { UserRef } from './user-ref.model';
export interface Commande {
  id?: number;
  client: UserRef;
  dateCommande: string;
  lignes: LigneCommande[];
}
