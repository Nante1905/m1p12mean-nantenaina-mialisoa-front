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
}

export interface DemandeDevis {
  vehiculeId: number;
  vehicule: Vehicule;
  saveVehicule: boolean;
  description: string;
  kilometrage: number;
}
