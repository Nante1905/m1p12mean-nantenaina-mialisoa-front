import { Service } from './Service';
import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface Devis {
  _id: string;
  date: string;
  ref: string;
  client: Utilisateur;
  services: Service[];
  vehicule: Vehicule;
  total: number;
  status: number;
  statusLabel?: string;
}
