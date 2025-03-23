import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface Intervention {
  _id: string;
  date: string;
  status: string;
  vehicule: Vehicule;
  client: Utilisateur;
}
