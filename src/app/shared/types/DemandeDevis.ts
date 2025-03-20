import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface DemandeDevisForm {
  vehiculeId: number;
  marque: string;
  modele: string;
  annee: string;
  motorisation: string;
  kilometrage: number;
  description: string;
  saveVehicule: boolean;
  immatriculation: string;
}

export interface DemandeDevis {
  _id: string;
  vehiculeId?: number;
  vehicule: Vehicule;
  saveVehicule?: boolean;
  description: string;
  kilometrage: number;
  dateDemande?: string;
  utilisateur?: Utilisateur;
  status?: number;
  statusLabel?: string;
  idDevis?: string;
}
