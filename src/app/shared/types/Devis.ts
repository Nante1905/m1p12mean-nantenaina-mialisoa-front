import { Service } from './Services';
import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface Devis {
  _id: string;
  date: string;
  ref: string;
  client: Utilisateur;
  services: Service[];
  vehicule: Vehicule;
  status: number;
  statusLabel?: string;
  numero: string;
  total: number;
}

export interface StatutStat {
  value: number;
  count: number;
  label: string;
}
