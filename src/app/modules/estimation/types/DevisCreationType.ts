import { Utilisateur } from '../../../shared/types/Utilisateur';
import { Vehicule } from '../../../shared/types/Vehicule';

export interface ServicesForm {
  _id: string;
  idService: string;
  nom: string;
  prix: number;
  heures: number;
}

export interface DevisCreationType {
  services: ServicesForm[];
  vehicule: Vehicule;
  client: Utilisateur;
}
