import { Service } from './Services';
import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

interface DevisService extends Service {
  heures: number;
  total: number;
}

export interface Devis {
  _id: string;
  date: string;
  ref: string;
  client: Utilisateur;
  services: DevisService[];
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
