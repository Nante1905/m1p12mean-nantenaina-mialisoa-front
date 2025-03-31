import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface Facture {
  _id: string;
  date: string;
  ref: string;
  client: Utilisateur;
  vehicule: Vehicule;
  details: DetailsFacture[];
  remise: number;
}

export interface DetailsFacture {
  idService: string;
  prix: number;
  heures: number;
  designation: string;
  remise: number;
}
